package br.com.project.service;

import br.com.project.service.dto.GradeDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link br.com.project.domain.Grade}.
 */
public interface GradeService {

    /**
     * Save a grade.
     *
     * @param gradeDTO the entity to save.
     * @return the persisted entity.
     */
    GradeDTO save(GradeDTO gradeDTO);

    /**
     * Get all the grades.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<GradeDTO> findAll(Pageable pageable);
    /**
     * Get all the GradeDTO where History is {@code null}.
     *
     * @return the list of entities.
     */
    List<GradeDTO> findAllWhereHistoryIsNull();


    /**
     * Get the "id" grade.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GradeDTO> findOne(Long id);

    /**
     * Delete the "id" grade.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
