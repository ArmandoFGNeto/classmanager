package br.com.project.service;

import br.com.project.service.dto.SchoolClassDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link br.com.project.domain.SchoolClass}.
 */
public interface SchoolClassService {

    /**
     * Save a schoolClass.
     *
     * @param schoolClassDTO the entity to save.
     * @return the persisted entity.
     */
    SchoolClassDTO save(SchoolClassDTO schoolClassDTO);

    /**
     * Get all the schoolClasses.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SchoolClassDTO> findAll(Pageable pageable);
    /**
     * Get all the SchoolClassDTO where History is {@code null}.
     *
     * @return the list of entities.
     */
    List<SchoolClassDTO> findAllWhereHistoryIsNull();


    /**
     * Get the "id" schoolClass.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SchoolClassDTO> findOne(Long id);

    /**
     * Delete the "id" schoolClass.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
