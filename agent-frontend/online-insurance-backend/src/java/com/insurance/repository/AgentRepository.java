package com.insurance.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.insurance.entity.*;
public interface AgentRepository extends MongoRepository<Agent, String> {
}

