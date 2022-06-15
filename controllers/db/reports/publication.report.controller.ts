import type { NextApiRequest, NextApiResponse } from "next";
import sequelize from "../../../src/db/db";
import { GeneratePubsApiBody, GeneratePubsPeopleOnlyApiBody } from "../../../types/publication.report.body";
import { PublicationSearchFilter } from '../../../types/publication.report.search';
import { Op, Sequelize } from "sequelize";
import { limits, metrics } from "../../../config/report";
import {
  AnalysisSummaryArticle,
  PersonArticleAuthor
} from "../../../src/db/models/init-models";
import models from "../../../src/db/sequelize";

models.AnalysisSummaryAuthor.hasOne(models.Person, { constraints: false });
models.AnalysisSummaryAuthor.hasMany(models.PersonPersonType, {
  constraints: false,
});
models.AnalysisSummaryAuthor.hasOne(models.AnalysisSummaryArticle, {
  constraints: false,
});
models.AnalysisSummaryArticle.hasOne(models.AnalysisSummaryAuthor, {
  constraints: false,
});

export const generatePubsRtf = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    let apiBody: GeneratePubsApiBody = JSON.parse(req.body);
    const generatePubsRtfOutput: any = await sequelize.query(
      "CALL generatePubsRTF (:uids , :pmids)",
      {
        replacements: { uids: apiBody.personIdentifiers.join(','), pmids: apiBody.pmids.join(',') },
        raw: true,
      }
    );
    return Array.isArray(generatePubsRtfOutput) &&
      generatePubsRtfOutput.length > 0
      ? generatePubsRtfOutput[0].x
      : "Error creating the file";
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

export const generatePubsPeopleOnlyRtf = async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    try {
      let apiBody: GeneratePubsPeopleOnlyApiBody = JSON.parse(req.body);
      const generatePubsPeopleOnlyRtfOutput: any = await sequelize.query(
        "CALL generatePubsPeopleOnlyRTF (:uids)",
        {
          replacements: { uids: apiBody.personIdentifiers?apiBody.personIdentifiers.join(','):'' },
          raw: true,
        }
      );
      console.log(generatePubsPeopleOnlyRtfOutput)
      return Array.isArray(generatePubsPeopleOnlyRtfOutput) &&
      generatePubsPeopleOnlyRtfOutput.length > 0
        ? generatePubsPeopleOnlyRtfOutput[0].x
        : "Error creating the file";
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  };

  export const generateAuthorshipReportCSV = async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    try {
      let apiBody: PublicationSearchFilter = req.body;
      const where = {};
      if (apiBody.filters) {
        where[Op.and] = [];
        if (
          apiBody.filters.journalTitleVerbose &&
          apiBody.filters.journalTitleVerbose.length > 0
        ) {
          where[Op.and].push({
            "$AnalysisSummaryArticle.journalTitleVerbose$": {
              [Op.in]: apiBody.filters.journalTitleVerbose,
            },
          });
        }
        if (
          apiBody.filters.personIdentifers &&
          apiBody.filters.personIdentifers.length > 0
        ) {
          where[Op.and].push({
            "$AnalysisSummaryAuthor.personIdentifier$": {
              [Op.in]: apiBody.filters.personIdentifers,
            },
          });
        }
        if (
          apiBody.filters.authorPosition &&
          apiBody.filters.authorPosition.length > 0
        ) {
          where[Op.and].push({
            "$AnalysisSummaryAuthor.authorPosition$": {
              [Op.in]: apiBody.filters.authorPosition,
            },
          });
        }
        if (apiBody.filters.orgUnits && apiBody.filters.orgUnits.length > 0) {
          where[Op.and].push({
            "$Person.primaryOrganizationalUnit$": {
              [Op.in]: apiBody.filters.orgUnits,
            },
          });
        }
        if (
          apiBody.filters.institutions &&
          apiBody.filters.institutions.length > 0
        ) {
          where[Op.and].push({
            "$Person.primaryInstitution$": {
              [Op.in]: apiBody.filters.institutions,
            },
          });
        }
        if (
          apiBody.filters.datePublicationAddedToEntrezLowerBound &&
          apiBody.filters.datePublicationAddedToEntrezUpperBound
        ) {
          where[Op.and].push({
            "$AnalysisSummaryArticle.datePublicationAddedToEntrez$": {
              [Op.gt]: apiBody.filters.datePublicationAddedToEntrezLowerBound,
            },
          });
          where[Op.and].push({
            "$AnalysisSummaryArticle.datePublicationAddedToEntrez$": {
              [Op.lt]: apiBody.filters.datePublicationAddedToEntrezUpperBound,
            },
          });
        }
        if (
          apiBody.filters.publicationTypeCanonical &&
          apiBody.filters.publicationTypeCanonical.length > 0
        ) {
          where[Op.and].push({
            "$AnalysisSummaryArticle.publicationTypeCanonical$": {
              [Op.in]: apiBody.filters.publicationTypeCanonical,
            },
          });
        }
        if (
          apiBody.filters.journalImpactScoreLowerBound &&
          apiBody.filters.journalImpactScoreUpperBound
        ) {
          where[Op.and].push({
            "$AnalysisSummaryArticle.journalImpactScore1$": {
              [Op.gt]: apiBody.filters.journalImpactScoreLowerBound,
            },
          });
          where[Op.and].push({
            "$AnalysisSummaryArticle.journalImpactScore1$": {
              [Op.lt]: apiBody.filters.journalImpactScoreUpperBound,
            },
          });
        }
        if (
          apiBody.filters.personTypes &&
          apiBody.filters.personTypes.length > 0
        ) {
          where[Op.and].push({
            "$PersonPersonTypes.personType$": {
              [Op.in]: apiBody.filters.personTypes,
            },
          });
        }
      }
      const sort = [];
      if (apiBody && apiBody.sort) {
        if (apiBody.sort.datePublicationAddedToEntrez)
          sort.push(["datePublicationAddedToEntrez", "DESC"]);
  
        if (apiBody.sort.citationCountNIH)
          sort.push(["citationCountNIH", "DESC"]);
  
        if (apiBody.sort.journalImpactScore1)
          sort.push(["journalImpactScore1", "DESC"]);
  
        if (apiBody.sort.percentileNIH) 
          sort.push(["percentileNIH", "DESC"]);
  
        if (apiBody.sort.publicationDateStandarized)
          sort.push(["publicationDateStandarized", "DESC"]);
  
        if (apiBody.sort.readersMendeley) 
          sort.push(["readersMendeley", "DESC"]);
  
        if (apiBody.sort.trendingPubsScore)
          sort.push(["trendingPubsScore", "DESC"]);
      }
      let limit = limits.maxCountPubsReturn;
      let articleLevelMetrics = Object.keys(metrics.article).filter(metric => metrics[metric]);
      let doiUrl = 'https://dx.doi.org/';
      let searchOutput: any[] = [];
      searchOutput = await models.AnalysisSummaryAuthor.findAll({
        include: [
          {
            model: models.AnalysisSummaryArticle,
            as: "AnalysisSummaryArticle",
            required: true,
            on: {
              col: Sequelize.where(
                Sequelize.col("AnalysisSummaryArticle.pmid"),
                "=",
                Sequelize.col("AnalysisSummaryAuthor.pmid")
              ),
            },
            attributes: [
              "pmid",
              "articleTitle",
              "pmcid",
              "articleYear",
              "publicationDateDisplay",
              "publicationDateStandardized",
              "datePublicationAddedToEntrez",
              "journalTitleVerbose",
              "issue",
              "pages",
              "volume",
              [Sequelize.fn("CONCAT", doiUrl, Sequelize.col("doi")), "doi"],
              ...articleLevelMetrics
            ],
          },
          {
            model: models.Person,
            as: "Person",
            required: true,
            on: {
              col: Sequelize.where(
                Sequelize.col("Person.personIdentifier"),
                "=",
                Sequelize.col("AnalysisSummaryAuthor.personIdentifier")
              )
            },
            attributes: ["firstName", "lastName", "primaryOrganizationalUnit", "primaryInstitution", "personIdentifier"]
          },
          {
            model: models.PersonPersonType,
            as: "PersonPersonTypes",
            required: true,
            on: {
              col1: Sequelize.where(
                Sequelize.col("AnalysisSummaryAuthor.personIdentifier"),
                "=",
                Sequelize.col("PersonPersonTypes.personIdentifier"),
              ),
              col2: Sequelize.where(
                Sequelize.col("Person.personIdentifier"),
                "=",
                Sequelize.col("PersonPersonTypes.personIdentifier"),
              ),
            },
            attributes: ["personType"]
          }
        ],
        where: where,
        group: ["AnalysisSummaryAuthor.pmid", "AnalysisSummaryAuthor.personIdentifier"],
        order: [],
        limit: 10,
        subQuery: false,
        attributes: []
      })
      return searchOutput;
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  };