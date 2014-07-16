/**
 * 
 */
package com.mcm.cpdt.memorygame.utility;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * @author Shrikant Havale
 * 
 * This class contains utility methods for reducing size of image, converting to base 64 format and again back to image from base 64
 * 
 */
public class ImageUtility {

	/**
	 * width constant for image to be resized
	 */
	private static final int IMG_WIDTH = 128;

	/**
	 * height constant for image to be resized
	 */
	private static final int IMG_HEIGHT = 128;

	/**
	 * Decode Base 64 string to image to be displayed
	 * 
	 * @param imageString
	 *            The string to decode
	 * 
	 * @return decoded image decode image
	 */
	public static BufferedImage decodeToImage(String imageString) {

		// buffered image
		BufferedImage image = null;

		// image bytes
		byte[] imageByte;

		try {

			// base 64 decoder
			BASE64Decoder decoder = new BASE64Decoder();

			// decode the image
			imageByte = decoder.decodeBuffer(imageString);
			ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);

			// convert stream to image
			image = ImageIO.read(bis);

			// close the stream
			bis.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		// return the image
		return image;
	}

	/**
	 * Encode image to Base64Encoder format to be stored in the database
	 * 
	 * @param image
	 *            The image to be encoded in the format
	 * @param type
	 *            jpeg, bmp, png
	 * 
	 * @return encoded string
	 */
	public static String encodeToString(BufferedImage image, String type) {

		// image string
		String imageString = null;

		// use byte stream
		ByteArrayOutputStream bos = new ByteArrayOutputStream();

		try {

			// write the image in bos
			ImageIO.write(image, type, bos);
			byte[] imageBytes = bos.toByteArray();

			// use base64encoder to convert it
			BASE64Encoder encoder = new BASE64Encoder();
			imageString = encoder.encode(imageBytes);

			// close the byte stream
			bos.close();

		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}

		// return string
		return imageString;
	}

	/**
	 * Resize the original image to the height and width specified in constants,
	 * here 128*128
	 * 
	 * @param originalImage
	 *            image to be resized
	 * @param type
	 *            type of the image, preferably BufferedImage.TYPE_INT_RGB
	 * 
	 * @return resized buffered image
	 */
	public static BufferedImage resizeImageWithHint(
			BufferedImage originalImage, int type) {

		BufferedImage resizedImage = new BufferedImage(IMG_WIDTH, IMG_HEIGHT,
				type);
		Graphics2D g = resizedImage.createGraphics();
		g.drawImage(originalImage, 0, 0, IMG_WIDTH, IMG_HEIGHT, null);
		g.dispose();
		g.setComposite(AlphaComposite.Src);

		g.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
				RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		g.setRenderingHint(RenderingHints.KEY_RENDERING,
				RenderingHints.VALUE_RENDER_QUALITY);
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
				RenderingHints.VALUE_ANTIALIAS_ON);

		return resizedImage;
	}

}
