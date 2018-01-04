package za.co.sbic.dev.vendingmachineapp.product.beverage;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.math.BigDecimal;

@Data
@Entity
public class Beverage implements Serializable {

    @Id
    @GeneratedValue
    private long id;

    private String name;
    private String description;
    private BigDecimal price;
    private String image;
    private String w;
    private String h;

    //@Setter
    //@Getter
    private int quantity;

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    public Beverage() {}

    public Beverage(String name, String description, BigDecimal price, String image, String w, String h, int quantity) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.w = w;
        this.h = h;
        this.quantity = quantity;
    }

}
