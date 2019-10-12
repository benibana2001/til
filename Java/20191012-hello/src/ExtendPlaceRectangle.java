public class ExtendPlaceRectangle extends ExtendRectangle {
    // location
    private int x;
    private int y;

    ExtendPlaceRectangle() {
        super();
        setLocation(0, 0);
    }

    ExtendPlaceRectangle(int x, int y) {
       super();
       setLocation(x, y);
    }

    ExtendPlaceRectangle(int x, int y, int width, int height) {
        super(width, height);
        setLocation(x, y);
    }

    private void setLocation(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public String toString() {
        return "[" + this.x + ", " + this.y + ", " + this.width + ", " + this.height + "]";
    }

    public static void main(String[] args) {
        ExtendPlaceRectangle p1 = new ExtendPlaceRectangle();
        ExtendPlaceRectangle p2 = new ExtendPlaceRectangle(10, 11);
        ExtendPlaceRectangle p3 = new ExtendPlaceRectangle(10, 11, 100, 110);

        System.out.println(p1);
        System.out.println(p2);
        System.out.println(p3);
    }
}
