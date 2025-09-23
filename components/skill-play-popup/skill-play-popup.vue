<template>
	<uni-popup ref="popup" type="center" @maskClick="closeAction" @change="onChange">
		<view class="wrap">
			<view class="title_wrap">

				<image class="title_icon" :src="$util.ossImagePath('/learn/line_left_tag.png')"></image>
				<text class="title_text">速记技巧</text>
				<image class="close_icon" :src="$util.ossImagePath('/learn/learn_left_err.png')" @click="closeAction">
				</image>
			</view>
			<view class="content_wrap">
				<mp-html :content="showSkillText"></mp-html>
			</view>
			<!-- :src="getContentImage" -->
			<image class="content_img" :src="getContentImage()">
			</image>
			<view class="free_count_warp" v-if="!isVip && freeTime > 0">剩余{{freeTime}}次体验机会</view>
			<view class="free_count_warp" v-if="!isVip && freeTime == 0">免费机会已用完</view>
			<view class="btn_warp">
				<button class="btn_replay" @click="replay">重听</button>

				<button class="btn_open_vip" v-if="!isVip" @click="openVip">开通会员</button>
				<button class="btn_close" v-if="isVip" @click="closeAction">关闭</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import {
		isVip,
		skillFreeQuestionIds,
		skillFreeTime
	} from '../../common/util';

	export default {
		name: "skill-play-popup",
		props: {
			isshow: {
				type: Boolean,
				default: false
			},
			isVip: {
				type: Boolean,
				default: false
			},
			skillData: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				useOutskillText: "",
				skillText: "",
				skillText2: "",
				colorIndex: 0,
				timerId: undefined,
				innerAudioContext: null,
				freeTime: 0,
				freeQuestionIds: [],
				// isVip: false,
			};
		},
		watch: {
			isshow(newValue, oldValue) {
				if (this.isshow) {
					this.freeTime = skillFreeTime()
					this.freeQuestionIds = skillFreeQuestionIds()
					// this.isVip = isVip(this)
					this.$refs.popup.open()
				} else {
					this.stopAudio()
				}
			},
			isVip(newValue, oldValue) {
				console.log('====isvip:' + newValue);
			}
		},
		computed: {
			showSkillText() {
				if (!this.isVip && this.skillData && !this.isContain(this.skillData.jkbdId)) {
					return this.useOutskillText;
				} else {
					if (this.colorIndex % 2 == 0) {
						return this.skillText;
					}
					return this.skillText2;
				}
			}
		},
		methods: {
			isContain(element) {
				for (var i = 0; i < this.freeQuestionIds.length; i++) {
					if (this.freeQuestionIds[i] == element) {
						return true
					}
				}
				return false;
			},
			closeAction() {
				this.$emit('closeAction')
				this.$refs.popup.close()
			},
			getContentImage() {
				if (this.skillData && this.skillData.skillImgUrl != undefined) {
					return "https://img.jx885.com/lrjk" + this.skillData.skillImgUrl;
				}
				return "";
			},
			replay() {
				this.stopAudio();
				this.playVoice();
			},
			openVip() {
				this.$emit('openVip')
				this.$emit('closeAction')
				// this.$refs.popup.close()
			},
			playVoice() {
				if (this.innerAudioContext) {
					try {
						this.innerAudioContext.pause();
						this.innerAudioContext.destroy()
						this.innerAudioContext = null
					} catch (e) {
						console.error("readQuestion:" + e)
					}
				}
				this.innerAudioContext = uni.createInnerAudioContext();
				let innerAudioContext = this.innerAudioContext;
				innerAudioContext.autoplay = true;
				if (this.skillData) {
					innerAudioContext.src = "https://img.jx885.com/lrjk" + this.skillData.skillVoice;
				}
				innerAudioContext.onPlay(() => {
					// console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				innerAudioContext.play();
			},
			stopAudio() {
				if (this.innerAudioContext) {
					this.innerAudioContext.stop();
				}
			},
			onChange(e) {
				if (e.show != true) {
					this.stopAudio();
					if (this.timerId != undefined) {
						clearInterval(this.timerId);
						this.timerId = undefined;
					}
					return
				}
				if (!this.skillData) {
					return
				}
				this.playVoice();
				if (this.skillData && this.skillData.skillText && this.skillData.skillText.length > 5) {
					this.useOutskillText = this.skillData.skillText.substring(0, 5) + "...";
				} else {
					this.useOutskillText = '看关键字答题...';
				}
				this.skillText = this.$util.deepCopyObject(this.skillData.skillText);
				this.skillText2 = this.$util.deepCopyObject(this.skillData.skillText);
				if (!(this.skillData.questionKey === "") && this.skillData.questionKey != undefined) {
					this.skillText = this.skillText.replaceAll(this.skillData.questionKey,
						"<font color='#FF0000'>" +
						this.skillData.questionKey + "</font>");

					this.skillText2 = this.skillText2.replaceAll(this.skillData.questionKey,
						"<font color='#727272'>" +
						this.skillData.questionKey + "</font>");
				}
				if (!(this.skillData.answerKey === "") && this.skillData.answerKey != undefined) {
					this.skillText = this.skillText.replaceAll(this.skillData.answerKey,
						"<font color='#FF0000'>" +
						this.skillData.answerKey + "</font>");
					this.skillText2 = this.skillText2.replaceAll(this.skillData.answerKey,
						"<font color='#727272'>" +
						this.skillData.answerKey + "</font>");
				}
				this.skillText = '<span style="color: #212121;">' + this.skillText + '</span>';
				this.skillText2 = '<span style="color: #212121;">' + this.skillText2 + '</span>';
				this.timerId = setInterval(() => {
					this.colorIndex = (this.colorIndex + 1) % 2;
				}, 1000);
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		width: 750rpx;
		height: 750rpx;
		background: #f3f7f9;
	}

	.title_wrap {
		width: 750rpx;
		padding: 20rpx 27rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		.title_icon {
			width: 5rpx;
			height: 40rpx;
		}

		.title_text {
			margin-left: 20rpx;
			color: #67666b;
			font-size: 40rpx;
			font-weight: bold;
		}

		.close_icon {
			width: 80rpx;
			height: 80rpx;
			position: absolute;
			right: 27rpx;
			top: 0rpx;
		}
	}

	.content_wrap {
		width: 750rpx;
		padding: 20rpx 27rpx;
		color: #747378;
		font-size: 35rpx;
	}

	.content_img {
		width: 700rpx;
		height: 300rpx;
		padding: 20rpx 27rpx;
	}

	.free_count_warp {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
		color: #67666b;
		font-size: 30rpx;
	}

	.btn_warp {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.btn_replay {
			border-radius: 20rpx;
			width: 300rpx;
			height: 80rpx;
			background: #fff;
			color: #e51c23;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}

		.btn_open_vip {
			border-radius: 20rpx;
			width: 300rpx;
			height: 80rpx;
			background: #DCA904;
			color: #fff;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}

		.btn_close {
			border-radius: 20rpx;
			width: 300rpx;
			height: 80rpx;
			background: #fff;
			color: #727272;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}

	}
</style>