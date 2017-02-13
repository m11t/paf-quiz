package m11.mib.paf.quiz.category;

import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.awt.image.WritableRaster;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

import org.springframework.util.Base64Utils;

/**
 * CategoryImageProvider
 * Helper class to expose the category images
 *
 * @author M11
 * @version 1.0
 */
public class CategoryImageProvider {
    
    public CategoryImageProvider() {}
    
    /**
     * @param imagePath on the classpath
     * @return image as base64 string
     * @throws IOException
     */
    private String getImageAsBase64(String imagePath) {
	BufferedImage bufferedImage;
	try {
	    bufferedImage = ImageIO.read(Thread.currentThread().getContextClassLoader().getResource(imagePath));
	} catch (IOException e) {
	    e.printStackTrace();
	    return "";
	}
	WritableRaster raster = bufferedImage.getRaster();
	DataBufferByte data   = (DataBufferByte) raster.getDataBuffer();
	return Base64Utils.encodeToUrlSafeString(data.getData());
    }

    private String getTextContent(String imagePath) {
	InputStream bufferedImage;
	try {
	    bufferedImage = (InputStream) Thread.currentThread().getContextClassLoader().getResource(imagePath).getContent();
	} catch (IOException e) {
	    e.printStackTrace();
	    return "";
	}
	return new BufferedReader(new InputStreamReader(bufferedImage)).lines().collect(Collectors.joining("\n"));
    }
    /**
     * @param categoryName for which the standard image is wanted
     * @return the standard image of the given category name
     */
    public String getImageFor(String categoryName) {
	switch (categoryName) {
	case CategoryInitializer.GEOGRAPHY:
	    return this.getGeographyImage();
	case CategoryInitializer.ENTERTAINMENT:
	    return this.getEntertainmentImage();
	case CategoryInitializer.HISTORY:
	    return this.getHistoryImage();
	case CategoryInitializer.ART_AND_LITERATURE:
	    return this.getArtsAndLiteratureImage();
	case CategoryInitializer.SCIENCE_AND_NATURE:
	    return this.getScienceAndNatureImage();
	case CategoryInitializer.SPORT_AND_LEISURE:
	    return this.getSportAndLeisureImage();
	}
	return "";
    }
    
    /**
     * @return the image for geography questions as base64 string
     */
    public String getGeographyImage() {
	//return "data:image/jpeg;base64," + getImageAsBase64("m11/mib/paf/quiz/category/geography.jpg");
	return getTextContent("m11/mib/paf/quiz/category/geography.txt");
    }
    
    /**
     * @return the image for entertainment questions as base64 string
     */
    public String getEntertainmentImage() {
	//return "data:image/jpeg;base64," + getImageAsBase64("m11/mib/paf/quiz/category/entertainment.jpg");
	return getTextContent("m11/mib/paf/quiz/category/entertainment.txt");
    }
    
    /**
     * @return the image for history questions as base64 string
     */
    public String getHistoryImage() {
	//return "data:image/jpeg;base64," + getImageAsBase64("m11/mib/paf/quiz/category/history.jpg");
	return getTextContent("m11/mib/paf/quiz/category/history.txt");
    }
    
    /**
     * @return the image for arts and literature questions as base64 string
     */
    public String getArtsAndLiteratureImage() {
	//return "data:image/jpeg;base64," + getImageAsBase64("m11/mib/paf/quiz/category/arts-and-literature.jpg");
	return getTextContent("m11/mib/paf/quiz/category/arts-and-literature.txt");
    }
    
    /**
     * @return the image for science and nature questions as base64 string
     */
    public String getScienceAndNatureImage() {
	//return "data:image/jpeg;base64," + getImageAsBase64("m11/mib/paf/quiz/category/science-and-nature.jpg");
	return getTextContent("m11/mib/paf/quiz/category/science-and-nature.txt");
    }
    
    /**
     * @return the image for sport and leisure questions as base64 string
     */
    public String getSportAndLeisureImage() {
	//return "data:image/jpeg;base64," + getImageAsBase64("m11/mib/paf/quiz/category/sport-and-leisure.jpg");
	return getTextContent("m11/mib/paf/quiz/category/sport-and-leisure.txt");
    }

}
