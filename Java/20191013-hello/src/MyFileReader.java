import java.io.FileNotFoundException;
import java.io.FileReader;

public class MyFileReader extends FileReader implements Printable{
    String filename = null;
    public MyFileReader(String filename) throws FileNotFoundException {
        super(filename);
        this.filename = filename;
    }

    @Override
    public void debugPrint(){
        System.out.println("インスタンスのファイル名は " + filename + " です。");
    }

    public static void main(String[] args) {
        try {
            MyFileReader m = new MyFileReader("test.txt");
            m.debugPrint();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
