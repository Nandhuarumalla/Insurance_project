package com.insurance.service;
import com.insurance.entity.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import com.insurance.repository.*;
@Service
public class AgentAvailabilityService {
    private final AgentAvailabilityRepository repository;

    public AgentAvailabilityService(AgentAvailabilityRepository repository) {
        this.repository = repository;
    }

    public AgentAvailability addOrUpdateAvailability(String agentId, String dayOfWeek, List<AgentAvailability.TimeSlot> timeSlots) {
        AgentAvailability availability = repository.findByAgentIdAndDayOfWeek(agentId, dayOfWeek);
        if (availability == null) {
            availability = new AgentAvailability();
            availability.setAgentId(agentId);
            availability.setDayOfWeek(dayOfWeek);
            availability.setCreatedAt(LocalDateTime.now());
        }
        availability.setTimeSlots(timeSlots);
        availability.setUpdatedAt(LocalDateTime.now());
        return repository.save(availability);
    }

    public List<AgentAvailability> getAvailabilityByAgent(String agentId) {
        return repository.findByAgentId(agentId);
    }
}

