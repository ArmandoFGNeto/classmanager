package br.com.project.service.mapper;

import br.com.project.domain.*;
import br.com.project.service.dto.GradeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Grade} and its DTO {@link GradeDTO}.
 */
@Mapper(componentModel = "spring", uses = {StudentMapper.class})
public interface GradeMapper extends EntityMapper<GradeDTO, Grade> {

    @Mapping(source = "student.id", target = "studentId")
    GradeDTO toDto(Grade grade);

    @Mapping(target = "history", ignore = true)
    @Mapping(source = "studentId", target = "student")
    Grade toEntity(GradeDTO gradeDTO);

    default Grade fromId(Long id) {
        if (id == null) {
            return null;
        }
        Grade grade = new Grade();
        grade.setId(id);
        return grade;
    }
}
