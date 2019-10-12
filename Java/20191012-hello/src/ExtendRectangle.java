abstract class ExtendRectangle {
    int width;
    int height;

    // Constructor #1
    ExtendRectangle() {
        setSize(100, 100);
    }

    // Constructor #2
    ExtendRectangle(int width, int height) {
        setSize(width, height);
    }

    private void setSize(int w, int h) {
        this.width = w;
        this.height = h;
    }

    @Override
    public String toString() {
        return "[" + width + ", " + height + "]";
    }
}
