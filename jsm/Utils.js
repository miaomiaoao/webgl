export const initShaders = (gl, vsSource, fsSource) => {
  const program = gl.createProgram();
  
  // 建立着色器对象
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // 将顶点着色器装进程序对象
  gl.attachShader(program, vertexShader);
  // 将片元着色器装进程序对象
  gl.attachShader(program, fragmentShader);

  // 连接webgl上下文对象和程序对象
  gl.linkProgram(program)

  // 启动对象
  gl.useProgram(program);
  
  // 将程序对象挂载到webgl上下文
  gl.program = program;

  return true;
}

function loadShader(gl, type, source) {
  // 根据着色器类型, 建立着色器对象
  const shader = gl.createShader(type);
  // 将着色器对象源文件传入着色器对象
  gl.shaderSource(shader, source);
  // 编译着色器对象
  gl.compileShader(shader);
  // 返回着色器对象
  return shader;
};

export function getMousePosInWebgl({ clientX, clientY }, canvas) {
  // 获取webgl的位置
  const { left, top, width, height } = canvas.getBoundingClientRect()
  // 获取canvas坐标
  const [cssX, cssY] = [clientX - left, clientY - top]
  // 解决坐标原点差异, webgl坐标的一个单位是canvas画布的宽高的一半
  const [halfWidth, halfHeight] = [width / 2, height / 2]
  const [xBaseCenter, yBaseCenter] = [cssX - halfWidth, cssY - halfHeight]
  // 解决y轴方向差异,canvasy轴为正,webgly轴可为负
  const yBaseCenterTop = -yBaseCenter
  // 解决坐标基地差异
  return {
    x: xBaseCenter / halfWidth,
    y: yBaseCenterTop / halfHeight
  }
}