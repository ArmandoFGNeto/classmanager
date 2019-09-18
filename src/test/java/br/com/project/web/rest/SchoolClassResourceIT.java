package br.com.project.web.rest;

import br.com.project.ClassmanagerApp;
import br.com.project.domain.SchoolClass;
import br.com.project.repository.SchoolClassRepository;
import br.com.project.service.SchoolClassService;
import br.com.project.service.dto.SchoolClassDTO;
import br.com.project.service.mapper.SchoolClassMapper;
import br.com.project.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static br.com.project.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SchoolClassResource} REST controller.
 */
@SpringBootTest(classes = ClassmanagerApp.class)
public class SchoolClassResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private SchoolClassRepository schoolClassRepository;

    @Autowired
    private SchoolClassMapper schoolClassMapper;

    @Autowired
    private SchoolClassService schoolClassService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSchoolClassMockMvc;

    private SchoolClass schoolClass;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SchoolClassResource schoolClassResource = new SchoolClassResource(schoolClassService);
        this.restSchoolClassMockMvc = MockMvcBuilders.standaloneSetup(schoolClassResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SchoolClass createEntity(EntityManager em) {
        SchoolClass schoolClass = new SchoolClass()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return schoolClass;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SchoolClass createUpdatedEntity(EntityManager em) {
        SchoolClass schoolClass = new SchoolClass()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return schoolClass;
    }

    @BeforeEach
    public void initTest() {
        schoolClass = createEntity(em);
    }

    @Test
    @Transactional
    public void createSchoolClass() throws Exception {
        int databaseSizeBeforeCreate = schoolClassRepository.findAll().size();

        // Create the SchoolClass
        SchoolClassDTO schoolClassDTO = schoolClassMapper.toDto(schoolClass);
        restSchoolClassMockMvc.perform(post("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClassDTO)))
            .andExpect(status().isCreated());

        // Validate the SchoolClass in the database
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeCreate + 1);
        SchoolClass testSchoolClass = schoolClassList.get(schoolClassList.size() - 1);
        assertThat(testSchoolClass.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSchoolClass.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createSchoolClassWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = schoolClassRepository.findAll().size();

        // Create the SchoolClass with an existing ID
        schoolClass.setId(1L);
        SchoolClassDTO schoolClassDTO = schoolClassMapper.toDto(schoolClass);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSchoolClassMockMvc.perform(post("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClassDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SchoolClass in the database
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolClassRepository.findAll().size();
        // set the field null
        schoolClass.setName(null);

        // Create the SchoolClass, which fails.
        SchoolClassDTO schoolClassDTO = schoolClassMapper.toDto(schoolClass);

        restSchoolClassMockMvc.perform(post("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClassDTO)))
            .andExpect(status().isBadRequest());

        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSchoolClasses() throws Exception {
        // Initialize the database
        schoolClassRepository.saveAndFlush(schoolClass);

        // Get all the schoolClassList
        restSchoolClassMockMvc.perform(get("/api/school-classes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(schoolClass.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getSchoolClass() throws Exception {
        // Initialize the database
        schoolClassRepository.saveAndFlush(schoolClass);

        // Get the schoolClass
        restSchoolClassMockMvc.perform(get("/api/school-classes/{id}", schoolClass.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(schoolClass.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSchoolClass() throws Exception {
        // Get the schoolClass
        restSchoolClassMockMvc.perform(get("/api/school-classes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSchoolClass() throws Exception {
        // Initialize the database
        schoolClassRepository.saveAndFlush(schoolClass);

        int databaseSizeBeforeUpdate = schoolClassRepository.findAll().size();

        // Update the schoolClass
        SchoolClass updatedSchoolClass = schoolClassRepository.findById(schoolClass.getId()).get();
        // Disconnect from session so that the updates on updatedSchoolClass are not directly saved in db
        em.detach(updatedSchoolClass);
        updatedSchoolClass
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        SchoolClassDTO schoolClassDTO = schoolClassMapper.toDto(updatedSchoolClass);

        restSchoolClassMockMvc.perform(put("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClassDTO)))
            .andExpect(status().isOk());

        // Validate the SchoolClass in the database
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeUpdate);
        SchoolClass testSchoolClass = schoolClassList.get(schoolClassList.size() - 1);
        assertThat(testSchoolClass.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSchoolClass.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingSchoolClass() throws Exception {
        int databaseSizeBeforeUpdate = schoolClassRepository.findAll().size();

        // Create the SchoolClass
        SchoolClassDTO schoolClassDTO = schoolClassMapper.toDto(schoolClass);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSchoolClassMockMvc.perform(put("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClassDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SchoolClass in the database
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSchoolClass() throws Exception {
        // Initialize the database
        schoolClassRepository.saveAndFlush(schoolClass);

        int databaseSizeBeforeDelete = schoolClassRepository.findAll().size();

        // Delete the schoolClass
        restSchoolClassMockMvc.perform(delete("/api/school-classes/{id}", schoolClass.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SchoolClass.class);
        SchoolClass schoolClass1 = new SchoolClass();
        schoolClass1.setId(1L);
        SchoolClass schoolClass2 = new SchoolClass();
        schoolClass2.setId(schoolClass1.getId());
        assertThat(schoolClass1).isEqualTo(schoolClass2);
        schoolClass2.setId(2L);
        assertThat(schoolClass1).isNotEqualTo(schoolClass2);
        schoolClass1.setId(null);
        assertThat(schoolClass1).isNotEqualTo(schoolClass2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SchoolClassDTO.class);
        SchoolClassDTO schoolClassDTO1 = new SchoolClassDTO();
        schoolClassDTO1.setId(1L);
        SchoolClassDTO schoolClassDTO2 = new SchoolClassDTO();
        assertThat(schoolClassDTO1).isNotEqualTo(schoolClassDTO2);
        schoolClassDTO2.setId(schoolClassDTO1.getId());
        assertThat(schoolClassDTO1).isEqualTo(schoolClassDTO2);
        schoolClassDTO2.setId(2L);
        assertThat(schoolClassDTO1).isNotEqualTo(schoolClassDTO2);
        schoolClassDTO1.setId(null);
        assertThat(schoolClassDTO1).isNotEqualTo(schoolClassDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(schoolClassMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(schoolClassMapper.fromId(null)).isNull();
    }
}
