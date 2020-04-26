var Shaders = {
  "./shaders/color.vert":
  `#version 100

struct BasicUniforms
{
    mat4 viewFromWorld;
    mat4 projFromView;
    float random;
    vec3 sunDir;
};

uniform vec4 b_s0b0_[10];
attribute vec3 in_0_;

void main()
{
    gl_Position = (mat4(b_s0b0_[4], b_s0b0_[5], b_s0b0_[6], b_s0b0_[7]) * mat4(b_s0b0_[0], b_s0b0_[1], b_s0b0_[2], b_s0b0_[3])) * vec4(in_0_, 1.0);
}`,
  "./shaders/debuglines.frag":
  `#version 100
precision mediump float;
precision highp int;

varying highp vec3 v_0_;

void main()
{
    gl_FragData[0] = vec4(v_0_, 1.0);
}`,
  "./shaders/debuglines.vert":
  `#version 100

struct BasicUniforms
{
    mat4 viewFromWorld;
    mat4 projFromView;
    float random;
    vec3 sunDir;
};

uniform vec4 b_s0b0_[10];
varying vec3 v_0_;
attribute vec3 in_1_;
attribute vec3 in_0_;

void main()
{
    v_0_ = in_1_;
    vec4 p = vec4(in_0_, 1.0);
    gl_Position = (mat4(b_s0b0_[4], b_s0b0_[5], b_s0b0_[6], b_s0b0_[7]) * mat4(b_s0b0_[0], b_s0b0_[1], b_s0b0_[2], b_s0b0_[3])) * p;
}`,
  "./shaders/geo.frag":
  `#version 100
precision mediump float;
precision highp int;

struct BasicUniforms
{
    highp mat4 viewFromWorld;
    highp mat4 projFromView;
    highp float random;
    highp vec3 sunDir;
};

struct ShadowReadUniforms
{
    highp mat4 readShadowFromWorld[4];
};

uniform highp vec4 b_s0b0_[10];
uniform highp vec4 b_s0b1_[16];
uniform highp sampler2D b_s0b2_;

varying vec3 v_2_;
varying highp float v_1_;
varying highp vec3 v_0_;
varying vec3 v_3_;

void main()
{
    vec3 sunColor = vec3(1.5, 0.75, 0.324999988079071044921875);
    vec3 skyColor = vec3(0.07500000298023223876953125, 0.1500000059604644775390625, 0.324999988079071044921875);
    vec3 L = b_s0b0_[9].xyz;
    vec3 N = normalize(v_2_);
    float NoL = dot(N, L);
    vec3 sunDiff = sunColor * max(0.0, NoL);
    vec3 skyDiff = vec3(0.5) + (skyColor * (0.5 * N.y));
    highp vec2 dither = fract(floor(gl_FragCoord.xy) * 0.5);
    highp float shadowZ = (-v_1_) * (1.0 + (0.20000000298023223876953125 * (dither.x + dither.y)));
    highp vec4 cascadeBounds = vec4(6.0, 12.0, 36.0, 118.0);
    highp mat4 shadowFromWorld;
    highp float shadowBias;
    if (shadowZ < cascadeBounds.x)
    {
        shadowFromWorld = mat4(b_s0b1_[0], b_s0b1_[1], b_s0b1_[2], b_s0b1_[3]);
        shadowBias = 1.0;
    }
    else
    {
        if (shadowZ < cascadeBounds.y)
        {
            shadowFromWorld = mat4(b_s0b1_[4], b_s0b1_[5], b_s0b1_[6], b_s0b1_[7]);
            shadowBias = 2.0;
        }
        else
        {
            if (shadowZ < cascadeBounds.z)
            {
                shadowFromWorld = mat4(b_s0b1_[8], b_s0b1_[9], b_s0b1_[10], b_s0b1_[11]);
                shadowBias = 3.0;
            }
            else
            {
                shadowFromWorld = mat4(b_s0b1_[12], b_s0b1_[13], b_s0b1_[14], b_s0b1_[15]);
                shadowBias = 5.0;
            }
        }
    }
    highp vec3 shadowUv = (shadowFromWorld * vec4(v_0_, 1.0)).xyz;
    shadowBias *= (0.001000000047497451305389404296875 * (0.07500000298023223876953125 + (0.375 * sqrt(max(0.001000000047497451305389404296875, (1.0 / max(0.001000000047497451305389404296875, NoL * NoL)) - 1.0)))));
    float light;
    if (shadowZ >= cascadeBounds.w)
    {
        light = 1.0;
    }
    else
    {
        highp vec2 texelSize = vec2(0.00048828125);
        for (highp float i = -1.0; i <= 1.0; i += 1.0)
        {
            for (highp float j = -1.0; j <= 1.0; j += 1.0)
            {
                highp float depth = texture2D(b_s0b2_, shadowUv.xy + (texelSize * vec2(i, j))).x;
                light += float(depth > (shadowUv.z - shadowBias));
            }
        }
        light *= 0.111111111938953399658203125;
    }
    sunDiff *= light;
    float checker = (0.75 + (0.3499999940395355224609375 * fract(0.5 * floor(v_0_.x)))) * (0.75 + (0.3499999940395355224609375 * fract(0.5 * floor(v_0_.z))));
    if (v_3_.y < (v_3_.x + v_3_.z))
    {
        checker = 1.0;
    }
    vec3 color = (v_3_ * checker) * (sunDiff + skyDiff);
    vec3 x = clamp(color - vec3(0.0040000001899898052215576171875), vec3(0.0), vec3(64.0));
    vec3 filmicColor = (x * ((x * 6.19999980926513671875) + vec3(0.5))) / ((x * ((x * 6.19999980926513671875) + vec3(1.7000000476837158203125))) + vec3(0.0599999986588954925537109375));
    gl_FragData[0] = vec4(filmicColor, 1.0);
}`,
  "./shaders/geo.vert":
  `#version 100

struct BasicUniforms
{
    mat4 viewFromWorld;
    mat4 projFromView;
    float random;
    vec3 sunDir;
};

uniform vec4 b_s0b0_[10];
attribute vec3 in_0_;
varying vec3 v_0_;
varying float v_1_;
varying mediump vec3 v_2_;
attribute vec3 in_1_;
varying mediump vec3 v_3_;
attribute vec3 in_2_;

void main()
{
    vec4 p = vec4(in_0_, 1.0);
    v_0_ = in_0_;
    v_1_ = (mat4(b_s0b0_[0], b_s0b0_[1], b_s0b0_[2], b_s0b0_[3]) * p).z;
    v_2_ = in_1_;
    v_3_ = pow(in_2_, vec3(2.2000000476837158203125));
    gl_Position = (mat4(b_s0b0_[4], b_s0b0_[5], b_s0b0_[6], b_s0b0_[7]) * mat4(b_s0b0_[0], b_s0b0_[1], b_s0b0_[2], b_s0b0_[3])) * p;
}`,
  "./shaders/green.frag":
  `#version 100
precision mediump float;
precision highp int;

struct BasicUniforms
{
    highp mat4 viewFromWorld;
    highp mat4 projFromView;
    highp float random;
    highp vec3 sunDir;
};

struct TestUniforms
{
    highp vec3 tint;
};

uniform highp vec4 b_s0b0_[10];
uniform highp vec4 b_s2b0_[1];
uniform highp sampler2D b_s2b1_;

void main()
{
    gl_FragData[0] = vec4((texture2D(b_s2b1_, vec2(0.5)).xyz * b_s2b0_[0].xyz) * vec3(0.0, 1.0, 0.0), 1.0) * b_s0b0_[8].x;
}`,
  "./shaders/red.frag":
  `#version 100
precision mediump float;
precision highp int;

struct TestUniforms
{
    highp vec3 tint;
};

uniform highp vec4 b_s2b0_[1];
uniform highp sampler2D b_s2b1_;

void main()
{
    gl_FragData[0] = vec4((texture2D(b_s2b1_, vec2(0.5)).xyz * b_s2b0_[0].xyz) * vec3(1.0, 0.0, 0.0), 1.0);
}`,
  "./shaders/shadow.frag":
  `#version 100
precision mediump float;
precision highp int;

void main()
{
    gl_FragData[0] = vec4(1.0);
}`,
  "./shaders/shadow.vert":
  `#version 100

struct ShadowWriteUniforms
{
    mat4 writeShadowFromWorld;
};

uniform vec4 b_s1b0_[4];
attribute vec3 in_0_;

void main()
{
    vec4 p = vec4(in_0_, 1.0);
    gl_Position = mat4(b_s1b0_[0], b_s1b0_[1], b_s1b0_[2], b_s1b0_[3]) * p;
}`,
  "./shaders/test-geo.frag":
  `#version 100
precision mediump float;
precision highp int;

struct ShadowReadUniforms
{
    highp mat4 readShadowFromWorld[4];
};

struct TestUniforms
{
    highp vec3 tint;
};

struct BasicUniforms
{
    highp mat4 viewFromWorld;
    highp mat4 projFromView;
    highp float random;
    highp vec3 sunDir;
};

uniform highp vec4 b_s0b1_[16];
uniform highp vec4 b_s2b0_[1];
uniform highp vec4 b_s0b0_[10];
uniform highp sampler2D b_s0b2_;
uniform highp sampler2D b_s2b1_;

varying highp float v_1_;
varying highp vec3 v_0_;
varying vec3 v_2_;

void main()
{
    highp vec2 dither = fract(floor(gl_FragCoord.xy) * 0.5);
    highp float shadowZ = (-v_1_) * (1.0 + (0.20000000298023223876953125 * (dither.x + dither.y)));
    highp vec4 cascadeBounds = vec4(6.0, 12.0, 36.0, 118.0);
    highp mat4 shadowFromWorld;
    highp float shadowBias;
    if (shadowZ < cascadeBounds.x)
    {
        shadowFromWorld = mat4(b_s0b1_[0], b_s0b1_[1], b_s0b1_[2], b_s0b1_[3]);
        shadowBias = 1.0;
    }
    else
    {
        if (shadowZ < cascadeBounds.y)
        {
            shadowFromWorld = mat4(b_s0b1_[4], b_s0b1_[5], b_s0b1_[6], b_s0b1_[7]);
            shadowBias = 2.0;
        }
        else
        {
            if (shadowZ < cascadeBounds.z)
            {
                shadowFromWorld = mat4(b_s0b1_[8], b_s0b1_[9], b_s0b1_[10], b_s0b1_[11]);
                shadowBias = 3.0;
            }
            else
            {
                shadowFromWorld = mat4(b_s0b1_[12], b_s0b1_[13], b_s0b1_[14], b_s0b1_[15]);
                shadowBias = 5.0;
            }
        }
    }
    highp vec3 shadowUv = (shadowFromWorld * vec4(v_0_, 1.0)).xyz;
    shadowBias *= 0.001000000047497451305389404296875;
    float light;
    if (shadowZ >= cascadeBounds.w)
    {
        light = 1.0;
    }
    else
    {
        highp vec2 texelSize = vec2(0.00048828125);
        for (highp float i = -1.0; i <= 1.0; i += 1.0)
        {
            for (highp float j = -1.0; j <= 1.0; j += 1.0)
            {
                highp float depth = texture2D(b_s0b2_, shadowUv.xy + (texelSize * vec2(i, j))).x;
                light += float(depth > (shadowUv.z - shadowBias));
            }
        }
        light *= 0.111111111938953399658203125;
    }
    light = mix(0.25, 1.0, light);
    gl_FragData[0] = vec4(((texture2D(b_s2b1_, v_0_.xy).xyz * light) * b_s2b0_[0].xyz) * v_2_, 1.0);
}`,
  "./shaders/test-geo.vert":
  `#version 100

struct BasicUniforms
{
    mat4 viewFromWorld;
    mat4 projFromView;
    float random;
    vec3 sunDir;
};

uniform vec4 b_s0b0_[10];
attribute vec3 in_0_;
varying vec3 v_0_;
varying float v_1_;
varying mediump vec3 v_2_;
attribute vec3 in_1_;

void main()
{
    vec4 p = vec4(in_0_, 1.0);
    v_0_ = in_0_;
    v_1_ = (mat4(b_s0b0_[0], b_s0b0_[1], b_s0b0_[2], b_s0b0_[3]) * p).z;
    v_2_ = in_1_;
    gl_Position = (mat4(b_s0b0_[4], b_s0b0_[5], b_s0b0_[6], b_s0b0_[7]) * mat4(b_s0b0_[0], b_s0b0_[1], b_s0b0_[2], b_s0b0_[3])) * p;
}`,
  "./shaders/vulkan-test.frag":
  `#version 100
precision mediump float;
precision highp int;

struct ShadowReadUniforms
{
    highp mat4 readShadowFromWorld[4];
};

struct BasicUniforms
{
    highp mat4 viewFromWorld;
    highp mat4 projFromView;
    highp float random;
    highp vec3 sunDir;
};

uniform highp vec4 b_s0b1_[16];
uniform highp vec4 b_s1b0_[10];
uniform highp sampler2D b_s0b2_;

varying highp float v_1_;
varying highp vec3 v_0_;
varying highp vec3 v_2_;

void main()
{
    highp vec2 dither = fract(floor(gl_FragCoord.xy) * 0.5);
    highp float shadowZ = (-v_1_) * (1.0 + (0.20000000298023223876953125 * (dither.x + dither.y)));
    highp vec4 cascadeBounds = vec4(6.0, 12.0, 36.0, 118.0);
    highp mat4 shadowFromWorld;
    highp float shadowBias;
    if (shadowZ < cascadeBounds.x)
    {
        shadowFromWorld = mat4(b_s0b1_[0], b_s0b1_[1], b_s0b1_[2], b_s0b1_[3]);
        shadowBias = 1.0;
    }
    else
    {
        if (shadowZ < cascadeBounds.y)
        {
            shadowFromWorld = mat4(b_s0b1_[4], b_s0b1_[5], b_s0b1_[6], b_s0b1_[7]);
            shadowBias = 2.0;
        }
        else
        {
            if (shadowZ < cascadeBounds.z)
            {
                shadowFromWorld = mat4(b_s0b1_[8], b_s0b1_[9], b_s0b1_[10], b_s0b1_[11]);
                shadowBias = 3.0;
            }
            else
            {
                shadowFromWorld = mat4(b_s0b1_[12], b_s0b1_[13], b_s0b1_[14], b_s0b1_[15]);
                shadowBias = 5.0;
            }
        }
    }
    highp vec3 shadowUv = (shadowFromWorld * vec4(v_0_, 1.0)).xyz;
    shadowBias *= 0.001000000047497451305389404296875;
    float light;
    if (shadowZ >= cascadeBounds.w)
    {
        light = 1.0;
    }
    else
    {
        highp vec2 texelSize = vec2(0.00048828125);
        for (highp float i = -1.0; i <= 1.0; i += 1.0)
        {
            for (highp float j = -1.0; j <= 1.0; j += 1.0)
            {
                highp float depth = texture2D(b_s0b2_, shadowUv.xy + (texelSize * vec2(i, j))).x;
                light += float(depth > (shadowUv.z - shadowBias));
            }
        }
        light *= 0.111111111938953399658203125;
    }
    light = mix(0.25, 1.0, light);
    gl_FragData[0] = vec4(b_s1b0_[8].x * light);
}`,
  "./shaders/vulkan-test.vert":
  `#version 100

uniform vec4 b_s0b0_[9];
attribute vec3 in_0_;
varying vec3 v_0_;
varying float v_1_;
varying vec3 v_2_;
attribute vec3 in_1_;

void main()
{
    vec4 p = vec4(in_0_, 1.0);
    v_0_ = in_0_;
    v_1_ = (mat4(b_s0b0_[0], b_s0b0_[1], b_s0b0_[2], b_s0b0_[3]) * p).z;
    v_2_ = in_1_;
    gl_Position = (mat4(b_s0b0_[4], b_s0b0_[5], b_s0b0_[6], b_s0b0_[7]) * mat4(b_s0b0_[0], b_s0b0_[1], b_s0b0_[2], b_s0b0_[3])) * p;
}`,
}

export { Shaders };