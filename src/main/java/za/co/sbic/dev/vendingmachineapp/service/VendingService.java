package za.co.sbic.dev.vendingmachineapp.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.co.sbic.dev.vendingmachineapp.product.beverage.Beverage;
import za.co.sbic.dev.vendingmachineapp.product.beverage.BeverageRepository;

import java.util.List;

@Service
public class VendingService {

    private static final Logger logger = LoggerFactory.getLogger(VendingService.class);
    private BeverageRepository beverageRepository;

    @Autowired
    private VendingService(BeverageRepository beverageRepository) {
        this.beverageRepository = beverageRepository;
    }

    public List<Beverage> loadBeverages() {
        //return beverageRepository.findAll();
        return null;
    }

}
