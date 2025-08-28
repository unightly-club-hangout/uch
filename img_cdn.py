import os

# Replace with your actual ImgCDN URL and settings
IMGCDN_BASE_URL = "https://example.imgix.net/"

def generate_imgcdn_url(filename, width=None, height=None, fit=None):
    url = IMGCDN_BASE_URL + filename
    params = []
    if width:
        params.append(f"w={width}")
    if height:
        params.append(f"h={height}")
    if fit:
        params.append(f"fit={fit}")
    if params:
        url += "?" + "&".join(params)
    return url

def serve_image(filename, width=None, height=None, fit=None):
    imgcdn_url = generate_imgcdn_url(filename, width, height, fit)
    return imgcdn_url

if __name__ == '__main__':
    # Example Usage:
    #  Assumes you have an image named 'image.jpg' accessible to your ImgCDN
    image_url = serve_image("image.jpg", width=200, height=100, fit="crop")
    print(image_url)
