/*****************************************************************
 * QTN GLOBAL CMS
 * Module : AI Parser
 * File   : parser/ai-parser.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const AIParser = {};

    //==========================================================
    // Parse Raw -> Draft
    //==========================================================

    AIParser.parse = async function (source) {

        const raw = ContentParser.parse(source);

        const draft = ProductUtils.createDraft();

        //======================================================
        // BASIC
        //======================================================

        draft.basic.name = ProductUtils.trim(raw.name);

        draft.basic.model = ProductUtils.trim(raw.model);

        draft.basic.brand = ProductUtils.normalizeBrand(raw.brand);

        draft.basic.category = ProductUtils.normalizeCategory(raw.category);

        draft.basic.origin = ProductUtils.normalizeOrigin(raw.origin);

        draft.basic.description = ProductUtils.trim(raw.description);

        draft.basic.slug = ProductUtils.slugify(draft.basic.name);

        draft.basic.folder = ProductUtils.generateFolder(draft.basic.model);

        //======================================================
        // TECHNICAL
        //======================================================

        draft.technical.capacities = raw.capacities || [];

        draft.technical.specifications = raw.specifications || {};

        draft.technical.features = raw.features || [];

        //======================================================
        // MEDIA
        //======================================================

        draft.media.images = raw.images || [];

        draft.media.pdf = raw.pdf || "";

        draft.media.video = raw.video || "";

        //======================================================
        // SEO
        //======================================================

        draft.seo.title = draft.basic.name;

        draft.seo.description = draft.basic.description;

        draft.seo.keywords = "";

        //======================================================
        // SYSTEM
        //======================================================

        draft.system.id = ProductUtils.getNextProductId();

        draft.system.createdAt = new Date().toISOString();

        draft.system.updatedAt = new Date().toISOString();

        return draft;

    };

    //==========================================================
    // Export
    //==========================================================

    window.AIParser = AIParser;

})(window);