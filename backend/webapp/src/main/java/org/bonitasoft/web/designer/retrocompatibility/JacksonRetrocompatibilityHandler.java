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
package org.bonitasoft.web.designer.retrocompatibility;

import java.io.IOException;

import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.deser.DeserializationProblemHandler;
import org.bonitasoft.web.designer.model.asset.Asset;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * This handler is called by Jackson when a property is unknown
 * @see org.bonitasoft.web.designer.retrocompatibility.ComponentMigrator
 */
public class JacksonRetrocompatibilityHandler extends DeserializationProblemHandler {

    protected static final Logger logger = LoggerFactory.getLogger(JacksonRetrocompatibilityHandler.class);

    @Override
    public boolean handleUnknownProperty(DeserializationContext ctxt, com.fasterxml.jackson.core.JsonParser jp, JsonDeserializer<?> deserializer, Object beanOrClass, String propertyName) throws IOException {

        if (beanOrClass instanceof Asset && "inactive".equals(propertyName)) {
            logger.info(String.format("%s is unknown value(%s) => property no more persisted after 1.0.0", propertyName, jp.getValueAsString()));
            return true;
        }

        //By default return false
        return super.handleUnknownProperty(ctxt, jp, deserializer, beanOrClass, propertyName);
    }
}
