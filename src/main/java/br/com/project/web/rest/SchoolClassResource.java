package br.com.project.web.rest;

import br.com.project.service.SchoolClassService;
import br.com.project.web.rest.errors.BadRequestAlertException;
import br.com.project.service.dto.SchoolClassDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link br.com.project.domain.SchoolClass}.
 */
@RestController
@RequestMapping("/api")
public class SchoolClassResource {

    private final Logger log = LoggerFactory.getLogger(SchoolClassResource.class);

    private static final String ENTITY_NAME = "schoolClass";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SchoolClassService schoolClassService;

    public SchoolClassResource(SchoolClassService schoolClassService) {
        this.schoolClassService = schoolClassService;
    }

    /**
     * {@code POST  /school-classes} : Create a new schoolClass.
     *
     * @param schoolClassDTO the schoolClassDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new schoolClassDTO, or with status {@code 400 (Bad Request)} if the schoolClass has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/school-classes")
    public ResponseEntity<SchoolClassDTO> createSchoolClass(@Valid @RequestBody SchoolClassDTO schoolClassDTO) throws URISyntaxException {
        log.debug("REST request to save SchoolClass : {}", schoolClassDTO);
        if (schoolClassDTO.getId() != null) {
            throw new BadRequestAlertException("A new schoolClass cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SchoolClassDTO result = schoolClassService.save(schoolClassDTO);
        return ResponseEntity.created(new URI("/api/school-classes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /school-classes} : Updates an existing schoolClass.
     *
     * @param schoolClassDTO the schoolClassDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated schoolClassDTO,
     * or with status {@code 400 (Bad Request)} if the schoolClassDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the schoolClassDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/school-classes")
    public ResponseEntity<SchoolClassDTO> updateSchoolClass(@Valid @RequestBody SchoolClassDTO schoolClassDTO) throws URISyntaxException {
        log.debug("REST request to update SchoolClass : {}", schoolClassDTO);
        if (schoolClassDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SchoolClassDTO result = schoolClassService.save(schoolClassDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, schoolClassDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /school-classes} : get all the schoolClasses.
     *

     * @param pageable the pagination information.

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of schoolClasses in body.
     */
    @GetMapping("/school-classes")
    public ResponseEntity<List<SchoolClassDTO>> getAllSchoolClasses(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("history-is-null".equals(filter)) {
            log.debug("REST request to get all SchoolClasss where history is null");
            return new ResponseEntity<>(schoolClassService.findAllWhereHistoryIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of SchoolClasses");
        Page<SchoolClassDTO> page = schoolClassService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /school-classes/:id} : get the "id" schoolClass.
     *
     * @param id the id of the schoolClassDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the schoolClassDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/school-classes/{id}")
    public ResponseEntity<SchoolClassDTO> getSchoolClass(@PathVariable Long id) {
        log.debug("REST request to get SchoolClass : {}", id);
        Optional<SchoolClassDTO> schoolClassDTO = schoolClassService.findOne(id);
        return ResponseUtil.wrapOrNotFound(schoolClassDTO);
    }

    /**
     * {@code DELETE  /school-classes/:id} : delete the "id" schoolClass.
     *
     * @param id the id of the schoolClassDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/school-classes/{id}")
    public ResponseEntity<Void> deleteSchoolClass(@PathVariable Long id) {
        log.debug("REST request to delete SchoolClass : {}", id);
        schoolClassService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
