package br.com.project.service.mapper;

import br.com.project.domain.*;
import br.com.project.service.dto.StudentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Student} and its DTO {@link StudentDTO}.
 */
@Mapper(componentModel = "spring", uses = {SchoolClassMapper.class, HistoryMapper.class})
public interface StudentMapper extends EntityMapper<StudentDTO, Student> {


    @Mapping(target = "grades", ignore = true)
    @Mapping(target = "removeGrade", ignore = true)
    @Mapping(target = "removeSchoolClass", ignore = true)
    @Mapping(target = "removeHistory", ignore = true)
    Student toEntity(StudentDTO studentDTO);

    default Student fromId(Long id) {
        if (id == null) {
            return null;
        }
        Student student = new Student();
        student.setId(id);
        return student;
    }
}
