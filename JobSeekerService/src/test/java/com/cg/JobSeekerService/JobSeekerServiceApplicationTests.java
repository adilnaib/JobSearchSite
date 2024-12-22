package com.cg.JobSeekerService;

import com.cg.JobSeekerService.exception.SeekerException;
import com.cg.JobSeekerService.service.JobSeekerService;
import com.cg.sharedmodule.model.Job;
import com.cg.sharedmodule.model.Seeker;
import com.cg.sharedmodule.repository.JobApplicationRepository;
import com.cg.sharedmodule.repository.JobRepository;
import com.cg.JobSeekerService.repository.JobSeekerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JobSeekerServiceApplicationTests {

	@Mock
	private JobRepository jobRepository;

	@Mock
	private JobSeekerRepository jobSeekerRepository;

	@Mock
	private JobApplicationRepository jobApplicationRepository;

	@InjectMocks
	private JobSeekerService jobSeekerService;

	// Test for searchJobsByLocation
	@Test
	void testSearchJobsByLocation() {
		// Mock data
		Job job1 = new Job();
		job1.setJobId(1L);
		job1.setJobLocation("New York");
		job1.setJobTitle("Software Engineer");

		Job job2 = new Job();
		job2.setJobId(2L);
		job2.setJobLocation("New York");
		job2.setJobTitle("Data Scientist");

		when(jobRepository.findByJobLocation("New York")).thenReturn(Arrays.asList(job1, job2));

		// Perform test
		List<Job> jobs = jobSeekerService.searchJobsByLocation("New York");

		// Assertions
		assertNotNull(jobs);
		assertEquals(2, jobs.size());
		assertEquals("Software Engineer", jobs.get(0).getJobTitle());
		assertEquals("Data Scientist", jobs.get(1).getJobTitle());

		// Verify interaction with the repository
		verify(jobRepository, times(1)).findByJobLocation("New York");
	}

	// Test for searchJobsByTitle
	@Test
	void testSearchJobsByTitle() {
		Job job = new Job();
		job.setJobTitle("Frontend Developer");
		when(jobRepository.findByJobTitle("Frontend Developer")).thenReturn(Collections.singletonList(job));

		List<Job> result = jobSeekerService.searchJobsByTitle("Frontend Developer");

		assertNotNull(result);
		assertEquals(1, result.size());
		assertEquals("Frontend Developer", result.get(0).getJobTitle());
	}

	// Test for registerJobSeeker
	@Test
	void testRegisterJobSeeker() {
		Seeker seeker = new Seeker();
		seeker.setJsName("John Doe");
		when(jobSeekerRepository.save(any(Seeker.class))).thenReturn(seeker);

		Seeker savedSeeker = jobSeekerService.registerJobSeeker(seeker);

		assertNotNull(savedSeeker);
		assertEquals("John Doe", savedSeeker.getJsName());
		verify(jobSeekerRepository, times(1)).save(seeker);
	}

	// Test for applyForJob (Success)
	@Test
	void testApplyForJobSuccess() {
		Job job = new Job();
		job.setJobId(1L);
		job.setJobTitle("Backend Developer");

		Seeker seeker = new Seeker();
		seeker.setJsId(2L);
		seeker.setJsName("Alice");

		when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
		when(jobSeekerRepository.findById(2L)).thenReturn(Optional.of(seeker));
		when(jobApplicationRepository.existsByJobAndSeeker(job, seeker)).thenReturn(false);

		String response = jobSeekerService.applyForJob(1L, 2L);

		assertNotNull(response);
		assertTrue(response.contains("Applied for job: Backend Developer"));
		verify(jobApplicationRepository, times(1)).save(any());
	}

	// Test for applyForJob (Already Applied)
	@Test
	void testApplyForJobAlreadyApplied() {
		Job job = new Job();
		job.setJobId(3L);
		Seeker seeker = new Seeker();
		seeker.setJsId(7L);

		when(jobRepository.findById(3L)).thenReturn(Optional.of(job));
		when(jobSeekerRepository.findById(7L)).thenReturn(Optional.of(seeker));
		when(jobApplicationRepository.existsByJobAndSeeker(job, seeker)).thenReturn(true);

		String response = jobSeekerService.applyForJob(3L, 7L);

		assertEquals("You have already applied", response);
	}

	// Test for getJobDetails
	@Test
	void testGetJobDetails() {
		Job job = new Job();
		job.setJobId(100L);
		job.setJobTitle("Test Engineer");
		when(jobRepository.findById(100L)).thenReturn(Optional.of(job));

		Job result = jobSeekerService.getJobDetails(100L);

		assertNotNull(result);
		assertEquals("Test Engineer", result.getJobTitle());
	}

	// Test for getJobDetails with Exception
	@Test
	void testGetJobDetailsNotFound() {
		when(jobRepository.findById(200L)).thenReturn(Optional.empty());

		SeekerException exception = assertThrows(SeekerException.class, () -> jobSeekerService.getJobDetails(200L));
		assertEquals("Job with ID 200 not found", exception.getMessage());
	}

//	// Test for addFavouriteJob
//	@Test
//	void testAddFavouriteJob() {
//		Job job = new Job();
//		job.setJobId(1L);
//		job.setJobTitle("QA Engineer");
//
//		Seeker seeker = new Seeker();
//		seeker.setJsId(2L);
//
//		when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
//		when(jobSeekerRepository.findById(2L)).thenReturn(Optional.of(seeker));
//
//		String response = jobSeekerService.addFavouriteJob(1L, 2L);
//
//		assertNotNull(response);
//		assertTrue(response.contains("Added job to favourites: QA Engineer"));
//		verify(jobSeekerRepository, times(1)).save(seeker);
//	}

	// Test for searchJobsBySkills
	@Test
	void testSearchJobsBySkills() {
		Job job1 = new Job();
		job1.setJobId(1L);
		job1.setRequiredSkills(Arrays.asList("Java", "Spring"));

		Job job2 = new Job();
		job2.setJobId(2L);
		job2.setRequiredSkills(Arrays.asList("Python", "Django"));

		when(jobRepository.findByRequiredSkills(any())).thenReturn(Arrays.asList(job1, job2));

		List<Map<String, Object>> foundJobs = jobSeekerService.searchJobsBySkills(Arrays.asList("Java", "Python"));

		assertNotNull(foundJobs);
		assertEquals(2, foundJobs.size());
	}

	// Test for viewJobSeekers (Success)
	@Test
	void testViewJobSeekers() {
		Seeker seeker1 = new Seeker();
		seeker1.setJsId(1L);

		Seeker seeker2 = new Seeker();
		seeker2.setJsId(2L);

		when(jobSeekerRepository.findAll()).thenReturn(Arrays.asList(seeker1, seeker2));

		List<Seeker> seekers = jobSeekerService.viewJobSeekers();

		assertNotNull(seekers);
		assertEquals(2, seekers.size());
	}
}
