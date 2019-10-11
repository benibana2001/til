import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class WhileSimple {
    public static void main(StringReplace[] args) {
        int i = 0;
        while (i < 3) {
            System.out.println(i);
            i++;
        }

        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

        try {
            String line = reader.readLine();
            while (line != null) {
                System.out.println(line);
                line = reader.readLine();
            }
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
