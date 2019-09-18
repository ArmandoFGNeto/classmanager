package br.com.project.service.mapper;

import br.com.project.domain.*;
import br.com.project.service.dto.SubjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Subject} and its DTO {@link SubjectDTO}.
 */
@Mapper(componentModel = "spring", uses = {SchoolClassMapper.class})
public interface SubjectMapper extends EntityMapper<SubjectDTO, Subject> {

    @Mapping(source = "schoolClass.id", target = "schoolClassId")
    SubjectDTO toDto(Subject subject);

    @Mapping(source = "schoolClassId", target = "schoolClass")
    @Mapping(target = "history", ignore = true)
    Subject toEntity(SubjectDTO subjectDTO);

    default Subject fromId(Long id) {
        if (id == null) {
            return null;
        }
        Subject subject = new Subject();
        subject.setId(id);
        return subject;
    }
}
