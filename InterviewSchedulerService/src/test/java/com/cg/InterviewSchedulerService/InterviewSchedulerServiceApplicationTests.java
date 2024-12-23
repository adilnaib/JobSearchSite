package com.cg.InterviewSchedulerService;

import com.cg.InterviewSchedulerService.controller.InterviewSchedulerController;
import com.cg.InterviewSchedulerService.model.InterviewScheduler;
import com.cg.InterviewSchedulerService.repository.InterviewSchedulerRepository;
import com.cg.InterviewSchedulerService.service.InterviewSchedulerService;
import com.cg.sharedmodule.model.JobApplication;
import com.cg.sharedmodule.repository.JobApplicationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class InterviewSchedulerServiceApplicationTests {

    @Autowired
    private ApplicationContext applicationContext;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private InterviewSchedulerRepository interviewSchedulerRepository;

    @MockBean
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private InterviewSchedulerService interviewSchedulerService;

    /**
     * Test if the application context loads correctly.
     */
    @Test
    void contextLoads() {
        assertThat(applicationContext).isNotNull();
    }

    /**
     * Test if the InterviewSchedulerController is loaded into the application context.
     */
    @Test
    void testInterviewSchedulerControllerIsLoaded() {
        assertThat(applicationContext.getBean(InterviewSchedulerController.class)).isNotNull();
    }

    /**
     * Test the REST endpoint to create an interview.
     */
    @Test
    void shouldCreateInterview() throws Exception {
        // Mock JobApplication retrieval
        JobApplication jobApplication = new JobApplication();
        jobApplication.setApplicationId(1L);
        when(jobApplicationRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(jobApplication));

        // Perform POST request
        mockMvc.perform(post("/interview/create/{jobApplicationId}", 1L)
                .contentType("application/json")
                .content("""
                        {
                            "date": "2024-12-25",
                            "time": "10:00:00",
                            "location": "123 Corporate Blvd",
                            "meetingLink": "https://example.com/interview/meeting-link",
                            "panelMembers": "John Doe, Jane Smith",
                            "interviewMode": "Online",
                            "interviewType": "Technical",
                            "instructions": "Prepare for a coding challenge",
                            "status": "Scheduled"
                        }
                        """))
                .andExpect(status().isOk());
    }

    /**
     * Test the service layer for creating an interview.
     */
    @Test
    void testCreateInterviewService() {
        // Mock JobApplication
        JobApplication jobApplication = new JobApplication();
        jobApplication.setApplicationId(1L);
        when(jobApplicationRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(jobApplication));

        // Create InterviewScheduler
        InterviewScheduler interviewScheduler = new InterviewScheduler();
        interviewScheduler.setDate(LocalDate.of(2024, 12, 25));
        interviewScheduler.setTime(LocalTime.of(10, 0));
        interviewScheduler.setLocation("123 Corporate Blvd");
        interviewScheduler.setStatus("Scheduled");

        InterviewScheduler savedInterview = interviewSchedulerService.createInterview(interviewScheduler, 1L);

        assertThat(savedInterview).isNotNull();
        assertThat(savedInterview.getJobApplication()).isEqualTo(jobApplication);
    }

    /**
     * Test repository interaction for saving and retrieving an interview.
     */
    @Test
    void testInterviewSchedulerRepository() {
        // Create and save an InterviewScheduler
        InterviewScheduler interviewScheduler = new InterviewScheduler();
        interviewScheduler.setDate(LocalDate.of(2024, 12, 25));
        interviewScheduler.setTime(LocalTime.of(10, 0));
        interviewScheduler.setLocation("123 Corporate Blvd");
        interviewScheduler.setStatus("Scheduled");

        InterviewScheduler savedInterview = interviewSchedulerRepository.save(interviewScheduler);

        assertThat(savedInterview).isNotNull();
        assertThat(savedInterview.getInterviewId()).isNotNull();

        // Retrieve by ID
        Optional<InterviewScheduler> retrievedInterview = interviewSchedulerRepository.findById(savedInterview.getInterviewId());
        assertThat(retrievedInterview).isPresent();
        assertThat(retrievedInterview.get().getStatus()).isEqualTo("Scheduled");
    }

    /**
     * Test cancelling an interview through the service layer.
     */
    @Test
    void testCancelInterviewService() {
        // Create and save an InterviewScheduler
        InterviewScheduler interviewScheduler = new InterviewScheduler();
        interviewScheduler.setDate(LocalDate.of(2024, 12, 25));
        interviewScheduler.setTime(LocalTime.of(10, 0));
        interviewScheduler.setLocation("123 Corporate Blvd");
        interviewScheduler.setStatus("Scheduled");

        InterviewScheduler savedInterview = interviewSchedulerRepository.save(interviewScheduler);

        // Cancel the interview
        interviewSchedulerService.cancelInterview(savedInterview.getInterviewId());

        // Verify status is updated
        InterviewScheduler updatedInterview = interviewSchedulerRepository.findById(savedInterview.getInterviewId())
                .orElseThrow(() -> new RuntimeException("Interview not found"));
        assertThat(updatedInterview.getStatus()).isEqualTo("Cancelled");
    }
}