package com.insurance.controller;
import com.insurance.entity.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.insurance.service.*;
@RestController
@RequestMapping("/api/availability")
public class AgentAvailabilityController {
    private final AgentAvailabilityService service;

    public AgentAvailabilityController(AgentAvailabilityService service) {
        this.service = service;
    }

    @PostMapping
    public AgentAvailability addOrUpdateAvailability(@RequestBody AgentAvailabilityRequest request) {
        return service.addOrUpdateAvailability(request.getAgentId(), request.getDayOfWeek(), request.getTimeSlots());
    }

    @GetMapping("/{agentId}")
    public List<AgentAvailability> getAvailability(@PathVariable String agentId) {
        return service.getAvailabilityByAgent(agentId);
    }
}

