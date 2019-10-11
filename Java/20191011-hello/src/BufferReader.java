import java.io.*;

public class BufferReader {
    public static void main(StringReplace[] args) {
        System.out.println("Input Your Name");
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

        try {
            StringReplace line = reader.readLine();
            System.out.println("Hello " + line);

            System.out.println("Enter Your Age");
            line = reader.readLine();
            int age = Integer.parseInt(line);

            System.out.println(age);

        } catch (IOException e) {
            System.out.println(e);
        } catch (NumberFormatException e) {
            System.out.println("Sorry, But Input Age is Not Correct");
        }

    }
}
