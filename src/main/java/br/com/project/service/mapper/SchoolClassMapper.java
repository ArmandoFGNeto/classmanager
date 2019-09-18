package br.com.project.service.mapper;

import br.com.project.domain.*;
import br.com.project.service.dto.SchoolClassDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link SchoolClass} and its DTO {@link SchoolClassDTO}.
 */
@Mapper(componentModel = "spring", uses = {TeacherMapper.class})
public interface SchoolClassMapper extends EntityMapper<SchoolClassDTO, SchoolClass> {

    @Mapping(source = "teacher.id", target = "teacherId")
    SchoolClassDTO toDto(SchoolClass schoolClass);

    @Mapping(target = "history", ignore = true)
    @Mapping(source = "teacherId", target = "teacher")
    @Mapping(target = "subjects", ignore = true)
    @Mapping(target = "removeSubject", ignore = true)
    @Mapping(target = "students", ignore = true)
    @Mapping(target = "removeStudent", ignore = true)
    SchoolClass toEntity(SchoolClassDTO schoolClassDTO);

    default SchoolClass fromId(Long id) {
        if (id == null) {
            return null;
        }
        SchoolClass schoolClass = new SchoolClass();
        schoolClass.setId(id);
        return schoolClass;
    }
}
