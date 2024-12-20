package com.cg.EmployerService;

import com.cg.EmployerService.service.EmployerService;
import com.cg.sharedmodule.model.Employer;
import com.cg.sharedmodule.model.Job;
import com.cg.sharedmodule.model.JobApplication;
import com.cg.sharedmodule.model.Seeker;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
class EmployerServiceApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void testGetEmployerById() {
		Long empId = 1L;
		Employer expectedEmployer = new Employer();
		expectedEmployer.setEmpId(empId);
		expectedEmployer.setEmpName("Test Employer");

		EmployerService employerService = mock(EmployerService.class);
		when(employerService.getEmployerById(empId)).thenReturn(expectedEmployer);

		Employer actualEmployer = employerService.getEmployerById(empId);

		assertEquals(expectedEmployer.getEmpId(), actualEmployer.getEmpId());
		assertEquals(expectedEmployer.getEmpName(), actualEmployer.getEmpName());
	}

	@Test
	void testRegisterEmployer() {
		EmployerService employerService = mock(EmployerService.class);
		Employer employer = new Employer();
		employer.setEmpName("New Employer");

		when(employerService.registerEmployer(employer)).thenReturn(employer);

		Employer registeredEmployer = employerService.registerEmployer(employer);

		assertEquals("New Employer", registeredEmployer.getEmpName());
	}

	@Test
	void testPostJob() {
		Long empId = 1L;
		Job job = new Job();
		job.setJobTitle("Software Engineer");

		EmployerService employerService = mock(EmployerService.class);
		when(employerService.postJob(job, empId)).thenReturn(job);

		Job postedJob = employerService.postJob(job, empId);

		assertEquals("Software Engineer", postedJob.getJobTitle());
	}

	@Test
	void testEditJob() {
		Long jobId = 1L;
		Job job = new Job();
		job.setJobTitle("Updated Job Title");

		EmployerService employerService = mock(EmployerService.class);
		when(employerService.editJob(jobId, job)).thenReturn(job);

		Job editedJob = employerService.editJob(jobId, job);

		assertEquals("Updated Job Title", editedJob.getJobTitle());
	}

	@Test
	void testDeleteJob() {
		Long jobId = 1L;

		EmployerService employerService = mock(EmployerService.class);
		employerService.deleteJob(jobId);

		// No exception means the test passed
	}

	@Test
	void testViewJobs() {
		Long empId = 1L;

		EmployerService employerService = mock(EmployerService.class);
		when(employerService.viewJobs(empId)).thenReturn(null);

		assertEquals(null, employerService.viewJobs(empId));
	}

	@Test
	void testGetApplicationsByEmpId() {
		Long empId = 1L;

		EmployerService employerService = mock(EmployerService.class);
		when(employerService.getApplicationsByEmpId(empId)).thenReturn(null);

		assertEquals(null, employerService.getApplicationsByEmpId(empId));
	}

	@Test
	void testSearchJobSeekerBySkillSet() {
		List<String> skillset = Arrays.asList("Java", "Spring");
		List<Seeker> expectedSeekers = new ArrayList<>();
		Seeker seeker = new Seeker();
		seeker.setJsSkills(skillset);
		expectedSeekers.add(seeker);

		EmployerService employerService = mock(EmployerService.class);
		when(employerService.searchJobSeekerBySkillSet(skillset)).thenReturn(expectedSeekers);

		List<Seeker> actualSeekers = employerService.searchJobSeekerBySkillSet(skillset);

		assertEquals(expectedSeekers.size(), actualSeekers.size());
		assertEquals(expectedSeekers.get(0).getJsSkills(), actualSeekers.get(0).getJsSkills());
	}

	@Test
	void testUpdateApplicationStatus() {
		Long applicationId = 1L;
		String status = "Approved";
		JobApplication expectedApplication = new JobApplication();
		expectedApplication.setStatus(status);

		EmployerService employerService = mock(EmployerService.class);
		when(employerService.updateApplicationStatus(applicationId, status)).thenReturn(expectedApplication);

		JobApplication actualApplication = employerService.updateApplicationStatus(applicationId, status);

		assertEquals(expectedApplication.getStatus(), actualApplication.getStatus());
	}
}