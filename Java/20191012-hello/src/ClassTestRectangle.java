public class ClassTestRectangle {
    private static int number = 0;
    private static int INITIAL_WIDTH = 100;
    private static int INITIAL_HEIGHT = 100;

    private int width;
    private int height;

    private int x;
    private int y;

    // Constructor #1
    private ClassTestRectangle() {
        setSize(INITIAL_WIDTH, INITIAL_HEIGHT);
        setLocation(0, 0);
        number++;
    }

    // Constructor #2
    private ClassTestRectangle(int w, int h) {
        setSize(w, h);
        setLocation(0, 0);
        number++;
    }

    // Constructor #3
    private ClassTestRectangle(int w, int h, int x, int y) {
        setSize(w, h);
        setLocation(x, y);
        number++;
    }

    private void setSize(int w, int h) {
        this.width = w;
        this.height = h;
    }

    private void setLocation(int x, int y) {
        this.x = x;
        this.y = y;
    }

    private int getArea() {
        return width * height;
    }

    // ２つのインスタンスの重なりから新たなインスタンスを作る
    private ClassTestRectangle intersect(ClassTestRectangle r) {
        // 重なりの大きい方の座標
        int sx = Math.max(this.x, r.x);
        int sy = Math.max(this.y, r.y);

        // 重なりの小さい方の座標
        int ex = Math.min(this.x + this.width, r.x + r.width);
        int ey = Math.min(this.y + this.height, r.y + r.height);

        int newwidth = ex - sx;
        int newheight = ey - sy;

        // 重なり判定
        boolean overlap = newwidth > 0 && newheight > 0;

        if (overlap) {
            return new ClassTestRectangle(newwidth, newheight, sx, sy);
        } else {
            return null;
        }
    }

    @Override
    public String toString() {
        String c = " ,";
        return "[" + x + c + y + c + width + c + height + "]";
    }

    public static void main(String[] args) {
        ClassTestRectangle r1 = new ClassTestRectangle();
        ClassTestRectangle r2 = new ClassTestRectangle(120, 140);
        ClassTestRectangle r3 = new ClassTestRectangle(120, 140, 60, 70);

        ClassTestRectangle wrap12 = r1.intersect(r2);
        ClassTestRectangle wrap13 = r1.intersect(r3);
        System.out.println(r1);
        System.out.println(r2);
        System.out.println(r3);

        // 重なり判定
        System.out.println("overlap r1, r2 -> " + wrap12);
        System.out.println("overlap r1, r2 -> " + wrap13);

        System.out.println("Count of Instance = " + number);
    }
}
