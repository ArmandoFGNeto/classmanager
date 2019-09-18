package br.com.project.service.mapper;

import br.com.project.domain.*;
import br.com.project.service.dto.HistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link History} and its DTO {@link HistoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {SchoolClassMapper.class, GradeMapper.class, SubjectMapper.class, TeacherMapper.class})
public interface HistoryMapper extends EntityMapper<HistoryDTO, History> {

    @Mapping(source = "schoolClass.id", target = "schoolClassId")
    @Mapping(source = "grade.id", target = "gradeId")
    @Mapping(source = "subject.id", target = "subjectId")
    @Mapping(source = "teacher.id", target = "teacherId")
    HistoryDTO toDto(History history);

    @Mapping(source = "schoolClassId", target = "schoolClass")
    @Mapping(source = "gradeId", target = "grade")
    @Mapping(source = "subjectId", target = "subject")
    @Mapping(source = "teacherId", target = "teacher")
    @Mapping(target = "students", ignore = true)
    @Mapping(target = "removeStudent", ignore = true)
    History toEntity(HistoryDTO historyDTO);

    default History fromId(Long id) {
        if (id == null) {
            return null;
        }
        History history = new History();
        history.setId(id);
        return history;
    }
}
