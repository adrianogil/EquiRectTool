class GLColor
{
    constructor(r,g,b,a)
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    static Black()
    {
        return new GLColor(0.0, 0.0, 0.0, 1.0);
    }
}