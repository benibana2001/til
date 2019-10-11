import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Switch {
    public static void main(String[] args) {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        try {
            System.out.println("Enter Drink Number");
            System.out.println("*1 Coffee");
            System.out.println("*2 OrangeJuice");
            System.out.println("*3 Coke");

            String line = reader.readLine();
            int n = Integer.parseInt(line);

            switch (n){
                case 1:
                    System.out.println("Coffee, it's good!");
                    break;
                case 2:
                    System.out.println("Orange, it's not bad!");
                    break;
                case 3:
                    System.out.println("ANGULAR IS THE BEST SOLUTIONS OF ALL. HOW DARE DID YOU DO? YOU MUST BE INSANE TO CHOSE THIS ONE");
                    break;
            }
        } catch (IOException e) {
            System.out.println(e);
        } catch (NumberFormatException e) {
            System.out.println(e);
        }
    }
}
