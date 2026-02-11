import React, { useEffect, useState } from "react";
import API from "../../services/api";

const Availability = () => {
  const [availability, setAvailability] = useState({
    agentId: "",
    dayOfWeek: "Monday",
    timeSlots: [
      { startTime: "", endTime: "", isActive: true }
    ]
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }

    // If agentId stored after login
    const agentId = localStorage.getItem("agentId");
    if (agentId) {
      setAvailability(prev => ({ ...prev, agentId }));
    }
  }, []);

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...availability.timeSlots];
    updatedSlots[index][field] = value;

    setAvailability({
      ...availability,
      timeSlots: updatedSlots
    });
  };

  const addSlot = () => {
    setAvailability({
      ...availability,
      timeSlots: [
        ...availability.timeSlots,
        { startTime: "", endTime: "", isActive: true }
      ]
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/availability", availability);
      alert("Availability saved successfully");
    } catch (error) {
      console.error(error);
      alert("Error saving availability");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Agent Availability</h2>

      <select
        value={availability.dayOfWeek}
        onChange={(e) =>
          setAvailability({ ...availability, dayOfWeek: e.target.value })
        }
      >
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        <option>Saturday</option>
        <option>Sunday</option>
      </select>

      <h4>Time Slots</h4>

      {availability.timeSlots.map((slot, index) => (
        <div key={index}>
          <input
            type="time"
            value={slot.startTime}
            onChange={(e) =>
              handleSlotChange(index, "startTime", e.target.value)
            }
          />

          <input
            type="time"
            value={slot.endTime}
            onChange={(e) =>
              handleSlotChange(index, "endTime", e.target.value)
            }
          />

          <label>
            Active
            <input
              type="checkbox"
              checked={slot.isActive}
              onChange={(e) =>
                handleSlotChange(index, "isActive", e.target.checked)
              }
            />
          </label>
        </div>
      ))}

      <button type="button" onClick={addSlot}>
        + Add Slot
      </button>

      <br /><br />

      <button type="submit">Save</button>
    </form>
  );
};

export default Availability;

