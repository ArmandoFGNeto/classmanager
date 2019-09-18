package br.com.project.service.impl;

import br.com.project.service.SchoolClassService;
import br.com.project.domain.SchoolClass;
import br.com.project.repository.SchoolClassRepository;
import br.com.project.service.dto.SchoolClassDTO;
import br.com.project.service.mapper.SchoolClassMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link SchoolClass}.
 */
@Service
@Transactional
public class SchoolClassServiceImpl implements SchoolClassService {

    private final Logger log = LoggerFactory.getLogger(SchoolClassServiceImpl.class);

    private final SchoolClassRepository schoolClassRepository;

    private final SchoolClassMapper schoolClassMapper;

    public SchoolClassServiceImpl(SchoolClassRepository schoolClassRepository, SchoolClassMapper schoolClassMapper) {
        this.schoolClassRepository = schoolClassRepository;
        this.schoolClassMapper = schoolClassMapper;
    }

    /**
     * Save a schoolClass.
     *
     * @param schoolClassDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public SchoolClassDTO save(SchoolClassDTO schoolClassDTO) {
        log.debug("Request to save SchoolClass : {}", schoolClassDTO);
        SchoolClass schoolClass = schoolClassMapper.toEntity(schoolClassDTO);
        schoolClass = schoolClassRepository.save(schoolClass);
        return schoolClassMapper.toDto(schoolClass);
    }

    /**
     * Get all the schoolClasses.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SchoolClassDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SchoolClasses");
        return schoolClassRepository.findAll(pageable)
            .map(schoolClassMapper::toDto);
    }



    /**
    *  Get all the schoolClasses where History is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<SchoolClassDTO> findAllWhereHistoryIsNull() {
        log.debug("Request to get all schoolClasses where History is null");
        return StreamSupport
            .stream(schoolClassRepository.findAll().spliterator(), false)
            .filter(schoolClass -> schoolClass.getHistory() == null)
            .map(schoolClassMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one schoolClass by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SchoolClassDTO> findOne(Long id) {
        log.debug("Request to get SchoolClass : {}", id);
        return schoolClassRepository.findById(id)
            .map(schoolClassMapper::toDto);
    }

    /**
     * Delete the schoolClass by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SchoolClass : {}", id);
        schoolClassRepository.deleteById(id);
    }
}
