public class ThreadSample extends Thread {
    public static void main(String[] args) {
        ThreadSample t = new ThreadSample();

        t.start();

        for (int i = 0; i < 10; i++) {
            System.out.println("main:i = " + i);
        }
    }

    @Override
    public void run(){
        for (int i = 0; i < 10; i++) {
            System.out.println("run:i = " + i);
        }
    }
}
