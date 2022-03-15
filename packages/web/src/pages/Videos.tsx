
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Amplify, Auth } from "aws-amplify";
import Colors from "../util/Colors";
import styled from "styled-components";
import { apiService } from "../services/api.service";
import moment from "moment";
import Icon, { Icons } from "../components/elements/Icon";
import LoaderContainer from "../components/elements/LoaderContainer";
import Loader from "../components/elements/Loader";
import { API_URLS } from "../config/api.config";
import Breadcum from "../components/Breadcum";
import { TableScroll } from "../components/elements/Table";
import { TableContainer } from "../components/elements/Table";
import { TableItem } from "../components/elements/Table";
import { HeaderText } from "../components/elements/Table";
import { TableData } from "../components/elements/Table";
import { TableBody } from "../components/elements/Table";
import { TableDataItem } from "../components/elements/Table";

const StyledIcon = styled(Icon)``;

const BreadCrumbContainer = styled.div`
   display: flex;
   width: 100%;
   height: 40px;
   align-items: center;
   &: first-child {
      padding-left: 15px;
   }
`;

const BreadItem = styled.div`
   display: flex;
   width: max-content;
   height: 40px;
   align-items: center;
   cursor: pointer;

   &: hover {
      & svg{
         color: ${Colors.blue} !important;
      }
      color: ${Colors.blue};
   }
`;

const MainDiv = styled.div`
   display: flex;
   width: 100%;
   flex-direction: column;
   align-items: flex-start;
   justify-content: flex-start;
   margin: auto;
   box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
   background:${Colors.white};
   @media screen and (max-width: 991px) {
      overflow: auto;
   }
`;

const HeadText = styled.div``;

const Video = () => {
   const navigate = useNavigate();
   const [responseResult, setResponseResult] = useState<any>([]);
   const [responseFolder, setResponseFolder] = useState([]);
   const [prefixData, setPrefixData] = useState("");
   const [bredCrumb, setBredCrumb] = useState([]);
   const [breadCrumbItems, setBreadCrumbItems] = useState<any>([""]);
   const [isFoldersLoading, setIsFoldersLoading] = useState(false);

   useEffect(() => {
      getResult();
      let splitArr: any = prefixData.split("/");
      if (splitArr.length) {
         splitArr = splitArr.splice(-1, 1);
      }

      setBredCrumb(splitArr);
   }, [prefixData]); // eslint-disable-line

   const getResult = () => {
      setIsFoldersLoading(true);
      apiService.post(
         API_URLS.BUCKET,
         { prefix: prefixData },
         (response) => {
            setResponseResult(response.results);
            setResponseFolder(response.folders);
         },
         () => {
            setIsFoldersLoading(false);
         }
      );
   };

   const viewImage = (e, res) => {
      e.preventDefault();
      apiService.post(
         API_URLS.BUCKET_VIEWFILE,
         { filename: res.filePath },
         (response) => {
            window.open(response);
         },
         () => { }
      );
   };

   const onBreadCrumbClick = (bred, i) => {
      const res = {
         folder: i === 0 ? "" : bred,
      };
      openFolder(res);

      const remainingItems = breadCrumbItems.slice(0, i + 1);

      setBreadCrumbItems(remainingItems);
   };

   const openFolder = (res) => {
      setPrefixData(res.folder);
      setBreadCrumbItems((old) => [...old, res.folder]);
   };

   return (
      <>
         <Breadcum text="Video" title=""></Breadcum>
         <MainDiv>
            <BreadCrumbContainer>
               {breadCrumbItems.length > 0 &&
                  breadCrumbItems.map((bred, i) => {
                     let stringWithoutSlash = bred.substring(0, bred.length - 1);
                     let folderName = stringWithoutSlash.substring(stringWithoutSlash.lastIndexOf("/"));
                     return (
                        <div
                           onClick={() => onBreadCrumbClick(bred, i)}
                           style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                           }}
                           key={i}
                        >
                           {i > 0 && (
                              <Icon
                                 margin="0 10px 0"
                                 size="18px"
                                 icon={Icons.RightArrow}
                              />
                           )}
                           <BreadItem>
                              {i === 0 ? (
                                 <Icon
                                    margin="0 10px 0 0"
                                    size="18px"
                                    icon={Icons.Home}
                                 />
                              ) : (
                                 folderName.replace("/", "")
                              )}
                           </BreadItem>
                        </div>
                     );
                  })}
            </BreadCrumbContainer>
            <TableScroll>
               <TableContainer>
                  {isFoldersLoading && (
                     <LoaderContainer>
                        <Loader />
                     </LoaderContainer>
                  )}
                  <TableItem>
                     <HeaderText>File Name</HeaderText>
                     <HeaderText>Last Modified Date</HeaderText>
                     <HeaderText>Size</HeaderText>
                     <HeaderText>Action</HeaderText>
                  </TableItem>
                  <TableBody>
                     {(responseResult.length === 1 && responseResult[0]?.filename === "") && responseFolder.length === 0 && <TableData><TableDataItem colSpan={4} className="noRecord">Record not found</TableDataItem></TableData>}
                     {responseFolder &&
                        responseFolder.map((res: any, i) => {
                           let stringWithoutSlash = res.folder.substring(0, res.folder.length - 1);
                           let folderName = stringWithoutSlash.substring(stringWithoutSlash.lastIndexOf("/"));
                           return (
                              <TableData key={i}>
                                 <TableDataItem colSpan={4} onClick={() => openFolder(res)}>
                                    <StyledIcon icon={Icons.Folder} />
                                    {folderName.replace("/", "")}
                                 </TableDataItem>
                              </TableData>
                           );
                        })}
                     {responseResult &&
                        responseResult.map((res: any, i) => {
                           if (i === 0) return;
                           return (
                              <TableData key={i}>
                                 <TableDataItem onClick={(e) => viewImage(e, res)}>
                                    <Icon icon={Icons.LinkSolid} />
                                    {res.filename}
                                 </TableDataItem>
                                 <TableDataItem>
                                    <HeadText>
                                       {moment(res.lastModified).format("MM/DD/YYYY")}
                                    </HeadText>
                                 </TableDataItem>
                                 <TableDataItem>
                                    <HeadText>{res.size}</HeadText>
                                 </TableDataItem>
                                 <TableDataItem>
                                    <HeadText>
                                       <Icon
                                          icon={Icons.Eye}
                                          title="View"
                                          onClick={(e) => viewImage(e, res)}
                                       />
                                    </HeadText>
                                 </TableDataItem>
                              </TableData>
                           );
                        })}
                  </TableBody>
               </TableContainer>
            </TableScroll>
         </MainDiv>
      </>
   );
};

export default Video;
