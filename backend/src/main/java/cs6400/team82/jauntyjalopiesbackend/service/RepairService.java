package cs6400.team82.jauntyjalopiesbackend.service;

import cs6400.team82.jauntyjalopiesbackend.dao.PartDAO;
import cs6400.team82.jauntyjalopiesbackend.dao.RepairDAO;
import cs6400.team82.jauntyjalopiesbackend.model.Part;
import cs6400.team82.jauntyjalopiesbackend.model.Repair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class RepairService {
    @Autowired
    private RepairDAO repairDAO;
    @Autowired
    private PartDAO partDAO;

    public void createRepair(Repair repair) {
        repairDAO.addRepair(repair);
    }

    public List<Repair> getActiveRepairByVin(String vin) {
        return repairDAO.getActiveRepairs(vin);
    }

    public List<Map<String, Object>> getRepairsByVin(String vin) {
        return repairDAO.getRepairsByVin(vin);
    }

    public boolean updateLaborCharge(String vin, Date startDate, Double laborCharge) {
        /**
         * @return True if updated successfully, False if less than previous labor charge
         */
        Repair repair = repairDAO.getRepairByVinAndStartdate(vin, startDate);
        if (laborCharge <= repair.getLaborCharge()) {
            return false;
        } else {
            repairDAO.updateLaborCharge(vin, startDate, laborCharge);
            return true;
        }
    }

    public void finishRepair(String vin, Date startDate) {
        repairDAO.finishRepair(vin, startDate);
    }

    public void addPartToRepair(String vin, Date startDate, String partNumber, String vendorName, Integer quantity, Double price) {
        Part part = new Part(vin, startDate, partNumber, vendorName, quantity, price);
        partDAO.createPart(part);
    }

    public List<Map<String, Object>> getRepairParts(Repair repair) {
        return repairDAO.getRepairParts(repair);
    }
}
