package com.insurance.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import com.insurance.entity.*;
public interface AgentAvailabilityRepository extends MongoRepository<AgentAvailability, String> {
    List<AgentAvailability> findByAgentId(String agentId);
    AgentAvailability findByAgentIdAndDayOfWeek(String agentId, String dayOfWeek);
}

