from PIL import Image
import potrace

# 加载图片
image_path = 'your_image.png'  # 替换为您的图片路径
image = Image.open(image_path)

# 将图片转换为黑白
bw_image = image.convert('1')

# 使用potrace将图片转换为路径
data = potrace.Bitmap(bw_image)
path = data.trace()

# 生成SVG内容
svg_content = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="{}" height="{}">\n'.format(
    image.width, image.height)
for curve in path:
    svg_content += '  <path d="'
    for segment in curve:
        if segment.is_corner:
            svg_content += 'M {},{} L {},{} L {},{} '.format(
                segment.c.x, segment.c.y, segment.end_point.x,
                segment.end_point.y, segment.c.x, segment.c.y)
        else:
            svg_content += 'M {},{} C {},{} {},{} {},{} '.format(
                segment.c1.x, segment.c1.y, segment.c2.x, segment.c2.y,
                segment.end_point.x, segment.end_point.y, segment.c1.x,
                segment.c1.y)
    svg_content += '" fill="black" />\n'
svg_content += '</svg>'

# 保存SVG文件
svg_path = 'output_image.svg'  # 替换为您想要的SVG文件路径
with open(svg_path, 'w') as svg_file:
    svg_file.write(svg_content)

print(f'SVG文件已保存到: {svg_path}')
