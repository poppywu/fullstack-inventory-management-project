package cs6400.team82.jauntyjalopiesbackend.controller;

import cs6400.team82.jauntyjalopiesbackend.model.Repair;
import cs6400.team82.jauntyjalopiesbackend.model.Part;
import cs6400.team82.jauntyjalopiesbackend.service.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class RepairController {
    @Autowired
    private RepairService repairService;

    @PostMapping(path = "/repair")
    public ResponseEntity<String> createRepair(@RequestBody Repair repair) {
        try {
            repairService.createRepair(repair);
            return new ResponseEntity<>("create a new repair", HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>("unable to create repair" , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/active-repair/{vin}")
    public ResponseEntity<List<Repair>> getActiveRepairsByVin(@PathVariable("vin") String vin) {
        /**
         * @return list containing one active repair or empty list
         */
        try {
            return new ResponseEntity<>(repairService.getActiveRepairByVin(vin), HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/repair/{vin}")
    public ResponseEntity<List<Map<String, Object>>> getAllRepairsByVin(@PathVariable("vin") String vin) {
        try {
            return new ResponseEntity<List<Map<String, Object>>>(repairService.getRepairsByVin(vin), HttpStatus.OK);
        } catch (Exception error) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/repair/parts")
    public ResponseEntity<List<Map<String, Object>>> getRepairParts(@RequestBody Repair repair) {
        try {
            return new ResponseEntity<List<Map<String, Object>>>(repairService.getRepairParts(repair), HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/repair/update-labor-charge")
    public ResponseEntity<String> updateLaborCharge(@RequestBody Repair updatedRepair) {
        /**
         * @param updatedRepair the repair entity with labor charge updated
         */
        try {
            boolean success = repairService.updateLaborCharge(updatedRepair.getVin(), updatedRepair.getStartDate(), updatedRepair.getLaborCharge());
            if (success) {
                return new ResponseEntity<>("Labor charge updated", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("New labor charge must be greater than previous", HttpStatus.NOT_MODIFIED);
            }
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>("Labor charge update failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/finish-repair")
    public ResponseEntity<String> finishRepair(@RequestBody Repair repair) {
        try {
            repairService.finishRepair(repair.getVin(), repair.getStartDate());
            return new ResponseEntity<>("Repair finished", HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>("Unable to finish repair", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/repair/add-part")
    public ResponseEntity<String> addPartToRepair(@RequestBody Part part) {
        try {
            repairService.addPartToRepair(part.getVin(), part.getStartDate(), part.getPartNumber(), part.getVendorName(), part.getQuantity(), part.getPrice());
            return new ResponseEntity<>("Part added to repair", HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>("Unable to add part to repair", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
