public class ExceptionTest {
    // CASE #1: 故意に異常終了を起こす
    /*
    public static void main(String[] args) {
        int[] myArray = new int[3];

        //
        System.out.println("insert integer");
        myArray[100] = 0;

        System.out.println("Success!");
    }
    */

    // CASE #2: Exceptionを実装
    public static void main(String[] args) {
        int[] myArray = new int[3];

        //
        try {
            System.out.println("insert integer");
            myArray[100] = 0;

            System.out.println("Success!");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Failed to Insert!");
            System.out.println(e);
        }

    }
}
