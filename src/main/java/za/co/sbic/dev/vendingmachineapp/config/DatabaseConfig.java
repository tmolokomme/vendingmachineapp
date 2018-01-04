package za.co.sbic.dev.vendingmachineapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import za.co.sbic.dev.vendingmachineapp.product.beverage.Beverage;
import za.co.sbic.dev.vendingmachineapp.product.beverage.BeverageRepository;

import java.math.BigDecimal;

@Component
public class DatabaseConfig implements CommandLineRunner {

    private final BeverageRepository repository;

    @Autowired
    public DatabaseConfig(BeverageRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        // Row 01
        this.repository.save(new Beverage("Coke", "Coca-Cola product", new BigDecimal("7.50"), "coke-icon.png", "100", "100", 20));
        this.repository.save(new Beverage("Sprite", "Coca-Cola product", new BigDecimal("8.50"), "sprite-icon.png", "100", "100", 15));
        this.repository.save(new Beverage("Fanta Orange", "Coca-Cola product", new BigDecimal("8.50"), "fanta-orange-icon.png", "100", "100", 7));
        this.repository.save(new Beverage("Fanta Grape", "Coca-Cola product", new BigDecimal("9.50"), "fanta-grape-icon.png", "65", "100", 10));
        // Row 02
        this.repository.save(new Beverage("Appletiser", "Coca-Cola product", new BigDecimal("12.50"), "appletiser-icon.png", "65", "100", 3));
        this.repository.save(new Beverage("Grapetiser", "Coca-Cola product", new BigDecimal("12.50"), "grapetiser-icon.png", "100", "100", 13));
        this.repository.save(new Beverage("Pepsi", "Coca-Cola product", new BigDecimal("7.00"), "pepsi-icon.png", "95", "100", 1));
        this.repository.save(new Beverage("Red Bull", "Coca-Cola product", new BigDecimal("24.50"), "redbull-icon.png", "100", "100", 0));

        System.out.println("Vending Machine ready to serve....");
    }
}
