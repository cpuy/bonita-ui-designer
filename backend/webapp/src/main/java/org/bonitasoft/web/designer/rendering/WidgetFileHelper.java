/**
 * Copyright (C) 2015 Bonitasoft S.A.
 * Bonitasoft, 32 rue Gustave Eiffel - 38000 Grenoble
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2.0 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package org.bonitasoft.web.designer.rendering;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

/**
 * @Author Benjamin Parisel
 */
public final class WidgetFileHelper {

    private static String FILENAME_PREFIX = "widgets-";

    public static Path writeFile(byte[] content, Path folderPath, String suffix) {
        Path path = folderPath.resolve(FILENAME_PREFIX + suffix + ".js");
        if (!Files.exists(path)) {
            writeFile(content, path);
        }
        return path;
    }

    public static void deleteOldConcatenateFiles(Path path, String suffix) {
        String regex = "^(?!.*?(?:" + suffix + ")).*$";
        // Resource leak: 'files' is never closed under windows so we need to put Files.list into try catch
        try (Stream<Path> files = Files.list(path)) {
            files.filter(p -> p.getFileName().toString().matches(regex) && !Files.isDirectory(p))
                 .forEach(p ->deleteFile(p));
        } catch (IOException e) {
            throw new GenerationException("Error while filter file in folder " + path.toString(), e);
        }
    }

    private static void writeFile(byte[] content, Path path) {
        try {
            Files.write(path, content);
        } catch (IOException e) {
            throw new GenerationException("Error while write file " + path.toString(), e);
        }
    }

    private static void deleteFile(Path p) {
        try {
            Files.delete(p);
        } catch (IOException e) {
            throw new GenerationException("Error while deleted file " + p.toString(), e);
        }
    }
}
