public class RunnableSample implements Runnable {
    public static void main(String[] args) {
        RunnableSample r = new RunnableSample();
        Thread t = new Thread(r);

        t.start();

        for (int i = 0; i < 10; i++){
            System.out.println("main:i = " + i);
        }
    }

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("run:i = " + i);
        }
    }
}
