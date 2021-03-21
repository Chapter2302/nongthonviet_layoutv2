<template>
  <div v-if="!isNoLayout">
    <!--Block A-->
    <BlockA id="blockA" :HomeA_Slide="HomeA_Slide" :HomeA_Main="HomeA_Main" />
    <!--Block A-->
  </div>
</template>

<script>
import homePageLayout from '@/assets/data/layout-v2-homepage.json'
import BlockA from "@/components/HomePage/BlockA/BlockA"
export default {
    components: {
        BlockA
    },
    async asyncData(context) {
        let layout = homePageLayout

        const setSortParams = listType => {
            let sortParams = {};
            switch (listType) {
                case "Tin nổi bật":
                sortParams = {
                    isFeatured: true,
                    sort: "isFeatured=desc,sortFeatured=desc,publicationTime=desc"
                };
                break;
                case "Xem nhiều nhất":
                sortParams = {
                    isMostView: true,
                    sort: "viewCount=desc,publicationTime=desc"
                };
                break;
                case "Tương tác nhiều nhất":
                sortParams = {
                    isMostInteract: true,
                    sort: "commentCount=desc,publicationTime=desc"
                };
                break;
                default:
                sortParams = {
                    sort: "publicationTime=desc"
                };
            }
            return sortParams;
        };

        if(layout && layout.containers && layout.containers.length > 0) {
            const findBlockByName = blockName => {
                return layout.containers.find(e => {
                    return e.name === blockName;
                });
            };
            const findSectionByName = (block, sectionName) => {
                return block.sections.find(e => {
                    return e.name === sectionName;
                });
            };

            let HomeA_Block = findBlockByName("HomeA");
            let HomeA_Slide = { items: [], grids: "" }
            let HomeA_Main = { items: [], grids: "" }

            let HomeASlideObj = findSectionByName(HomeA_Block, "HomeA_Slider");
            let HomeAMainObj = findSectionByName(HomeA_Block, "HomeA_Main");
            let ads = [];

            await Promise.all([
                context.store.dispatch("getArticleListing", {
                    skip: 0,
                    limit: 4,
                    data: {
                        ...setSortParams("Tin nổi bật"),
                        categoryId: HomeASlideObj ? HomeASlideObj.data.value : ""
                    },
                    nextActions: res => {
                        HomeA_Slide.items = [...res.result]
                        HomeA_Slide.grids = Object.keys(HomeASlideObj.size).reduce((grids, key, index) => {
                            return grids + (index != 0 ? " " : "") + `${key}:col-span-${HomeASlideObj.size[key]}`
                        }, "")
                    },
                    errorActions: err => {
                        console.log(err);
                    }
                }),

                context.store.dispatch("getArticleListing", {
                    skip: 0,
                    limit: 3,
                    data: {
                        ...setSortParams("Xem nhiều nhất"),
                        categoryId: HomeAMainObj ? HomeAMainObj.data.value : ""
                    },
                    nextActions: res => {
                        HomeA_Main.items = [...res.result]
                        HomeA_Main.grids = Object.keys(HomeAMainObj.size).reduce((grids, key, index) => {
                            return grids + (index != 0 ? " " : "") + `${key}:col-span-${HomeAMainObj.size[key]}`
                        }, "")
                    },
                    errorActions: err => {
                        console.log(err);
                    }
                })
            ])

            return {
                isNoLayout: false,
                HomeA_Block,
                HomeA_Slide,
                HomeA_Main,
            }
        } else {
            return {
                isNoLayout: true,
            }
        }
    }
}
</script>

<style>

</style>