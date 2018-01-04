package za.co.sbic.dev.vendingmachineapp.product.beverage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BeverageService {

    @Autowired
    BeverageRepository beverageRepo;

    public List<Beverage> getAllBeverages() {
        List<Beverage> beverages = new ArrayList<>();
        beverageRepo.findAll().forEach(beverages::add); //topics;
        return beverages;
    }

    public Beverage getBeverage(long id) {
        return beverageRepo.findOne(id);
        /*
        return topics.stream()
        .filter(item -> item.getId()==id)
        .findFirst().get();
        */
    }

    public void addBeverage(Beverage beverage) {
        beverageRepo.save(beverage);
    }

    public void updateBeverage(long id, Beverage beverage) {

        beverageRepo.save(beverage);

    }

    public void deleteBeverage(long id) {

        beverageRepo.delete(id);
    }
}
