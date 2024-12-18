package com.cg.InterviewSchedulerService.service;

import com.cg.InterviewSchedulerService.model.InterviewScheduler;
import com.cg.InterviewSchedulerService.repository.InterviewSchedulerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterviewSchedulerService {

    @Autowired
    private InterviewSchedulerRepository interviewSchedulerRepository;

    public InterviewScheduler createInterview(InterviewScheduler interview) {
        return interviewSchedulerRepository.save(interview);
    }

    public List<InterviewScheduler> getAllInterviews() {
        return interviewSchedulerRepository.findAll();
    }

    public Optional<InterviewScheduler> getInterviewById(Long id) {
        return interviewSchedulerRepository.findById(id);
    }

    public InterviewScheduler updateInterview(Long id, InterviewScheduler details) {
        Optional<InterviewScheduler> existing = interviewSchedulerRepository.findById(id);
        if (existing.isPresent()) {
            InterviewScheduler interview = existing.get();
            interview.setCandidate(details.getCandidate());
            interview.setPosition(details.getPosition());
            interview.setDate(details.getDate());
            interview.setTime(details.getTime());
            interview.setInterviewMode(details.getInterviewMode());
            interview.setLocation(details.getLocation());
            interview.setInterviewType(details.getInterviewType());
            interview.setPanelMembers(details.getPanelMembers());
            interview.setMeetingLink(details.getMeetingLink());
            interview.setInstructions(details.getInstructions());
            interview.setStatus(details.getStatus());
            return interviewSchedulerRepository.save(interview);
        }
        return null;
    }

    public InterviewScheduler cancelInterview(Long id) {
        Optional<InterviewScheduler> interview = interviewSchedulerRepository.findById(id);
        if (interview.isPresent()) {
            InterviewScheduler toCancel = interview.get();
            toCancel.setStatus("Cancelled");
            return interviewSchedulerRepository.save(toCancel);
        }
        return null;
    }
}
