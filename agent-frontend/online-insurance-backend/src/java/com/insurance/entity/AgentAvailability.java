
package com.insurance.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "agent_availabilities")
public class AgentAvailability {
    @Id
    private String id;
    private String agentId;
    private String dayOfWeek;
    private List<TimeSlot> timeSlots;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // getters and setters

    public static class TimeSlot {
        private String startTime;
        private String endTime;
        private boolean isActive;

        // getters and setters
    }
}

