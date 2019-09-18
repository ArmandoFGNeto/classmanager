package br.com.project.service.dto;
import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link br.com.project.domain.Grade} entity.
 */
public class GradeDTO implements Serializable {

    private Long id;

    private Instant applicationDate;

    private Float value;


    private Long studentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(Instant applicationDate) {
        this.applicationDate = applicationDate;
    }

    public Float getValue() {
        return value;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GradeDTO gradeDTO = (GradeDTO) o;
        if (gradeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gradeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GradeDTO{" +
            "id=" + getId() +
            ", applicationDate='" + getApplicationDate() + "'" +
            ", value=" + getValue() +
            ", student=" + getStudentId() +
            "}";
    }
}
