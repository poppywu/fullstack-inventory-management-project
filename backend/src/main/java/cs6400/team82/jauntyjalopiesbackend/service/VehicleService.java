package cs6400.team82.jauntyjalopiesbackend.service;

import cs6400.team82.jauntyjalopiesbackend.dao.*;
import cs6400.team82.jauntyjalopiesbackend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class VehicleService {
    @Autowired
    private CarDAO carDAO;
    @Autowired
    private VanDAO vanDAO;
    @Autowired
    private ConvertibleDAO convertibleDAO;
    @Autowired
    private TruckDAO truckDAO;
    @Autowired
    private SUVDAO suvDAO;
    @Autowired
    private VehicleDAO vehicleDAO;


    public String getVehicleTypeByVin(String vin) {
        return vehicleDAO.getVehicleTypeByVin(vin);
    }

    public Object getVehicleByVin(String vin) throws Exception {
        String type = getVehicleTypeByVin(vin);
        if (type.toLowerCase().equals("car")) {
            return carDAO.getByCarId(vin);
        } else if (type.toLowerCase().equals("convertible")) {
            return convertibleDAO.getByConvertibleId(vin);
        } else if (type.toLowerCase().equals("van")) {
            return vanDAO.getByVanId(vin);
        } else if (type.toLowerCase().equals("truck")) {
            return truckDAO.getByTruckId(vin);
        } else if (type.toLowerCase().equals("suv")) {
            return suvDAO.getBySUVId(vin);
        } else {
            throw new Exception("error");
        }
    }

    public List<Vehicle> getByCriteria(Integer modelYear, String modelName, String manufacturerName, Double maxPrice, String color, String vehicleType, String description, Boolean sold, String vin) {
        return vehicleDAO.getByCriteria(modelYear, modelName, manufacturerName, color, maxPrice, vehicleType, description, sold, vin);
    }

    public Integer getNumofUnsoldVehicle() {
        return vehicleDAO.getNumOfUnsoldVehicles();
    }

    public void createCar(Car car) {
        carDAO.createCar(car);
    }

    public void createConvertible(Convertible convertible) {
        convertibleDAO.createConvertible(convertible);
    }

    public void createSUV(SUV suv) {
        suvDAO.createSUV(suv);
    }

    public void createVan(Van van) {
        vanDAO.createVan(van);
    }

    public void createTruck(Truck truck) {
        truckDAO.createTruck(truck);
    }
}
