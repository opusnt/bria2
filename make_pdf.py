from PIL import Image

def make_pdf():
    images = []
    for i in range(10):
        img = Image.open(f'slide_{i}.png').convert('RGB')
        images.append(img)
    
    if images:
        images[0].save('Propuesta_Politica_Publica_Bria_Web.pdf', save_all=True, append_images=images[1:])
        print("PDF created successfully: Propuesta_Politica_Publica_Bria_Web.pdf")

if __name__ == '__main__':
    make_pdf()
