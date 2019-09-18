package br.com.project.web.rest;

import br.com.project.service.GradeService;
import br.com.project.web.rest.errors.BadRequestAlertException;
import br.com.project.service.dto.GradeDTO;

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

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link br.com.project.domain.Grade}.
 */
@RestController
@RequestMapping("/api")
public class GradeResource {

    private final Logger log = LoggerFactory.getLogger(GradeResource.class);

    private static final String ENTITY_NAME = "grade";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GradeService gradeService;

    public GradeResource(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    /**
     * {@code POST  /grades} : Create a new grade.
     *
     * @param gradeDTO the gradeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gradeDTO, or with status {@code 400 (Bad Request)} if the grade has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/grades")
    public ResponseEntity<GradeDTO> createGrade(@RequestBody GradeDTO gradeDTO) throws URISyntaxException {
        log.debug("REST request to save Grade : {}", gradeDTO);
        if (gradeDTO.getId() != null) {
            throw new BadRequestAlertException("A new grade cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GradeDTO result = gradeService.save(gradeDTO);
        return ResponseEntity.created(new URI("/api/grades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /grades} : Updates an existing grade.
     *
     * @param gradeDTO the gradeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gradeDTO,
     * or with status {@code 400 (Bad Request)} if the gradeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gradeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/grades")
    public ResponseEntity<GradeDTO> updateGrade(@RequestBody GradeDTO gradeDTO) throws URISyntaxException {
        log.debug("REST request to update Grade : {}", gradeDTO);
        if (gradeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GradeDTO result = gradeService.save(gradeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gradeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /grades} : get all the grades.
     *

     * @param pageable the pagination information.

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of grades in body.
     */
    @GetMapping("/grades")
    public ResponseEntity<List<GradeDTO>> getAllGrades(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("history-is-null".equals(filter)) {
            log.debug("REST request to get all Grades where history is null");
            return new ResponseEntity<>(gradeService.findAllWhereHistoryIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of Grades");
        Page<GradeDTO> page = gradeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /grades/:id} : get the "id" grade.
     *
     * @param id the id of the gradeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gradeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/grades/{id}")
    public ResponseEntity<GradeDTO> getGrade(@PathVariable Long id) {
        log.debug("REST request to get Grade : {}", id);
        Optional<GradeDTO> gradeDTO = gradeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gradeDTO);
    }

    /**
     * {@code DELETE  /grades/:id} : delete the "id" grade.
     *
     * @param id the id of the gradeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/grades/{id}")
    public ResponseEntity<Void> deleteGrade(@PathVariable Long id) {
        log.debug("REST request to delete Grade : {}", id);
        gradeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
